import { Request, Response } from 'express';
import axios from 'axios';
import { UserModel } from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env

const IPSTACK_API_URL = 'http://api.ipstack.com/';
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY; // Obter a chave de API da variável de ambiente

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, address, coordinates } = req.body;

    // Validar se nome e email estão presentes
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    // Validar se apenas endereço ou coordenadas são fornecidos, não ambos ou nenhum
    if ((address && coordinates) || (!address && !coordinates)) {
      return res.status(400).json({ message: 'Provide either address or coordinates, not both or none.' });
    }

    // Se fornecido endereço, resolver coordenadas usando a API do IPstack
    let resolvedCoordinates: [number, number] | undefined;
    if (address) {
      const geoLocationServiceUrl = `${IPSTACK_API_URL}${encodeURIComponent(address)}?access_key=${IPSTACK_API_KEY}`;
      
      // Faça uma solicitação ao serviço de geolocalização usando axios
      const response = await axios.get(geoLocationServiceUrl);

      // Extraia as coordenadas da resposta (isso depende da estrutura da resposta do serviço)
      resolvedCoordinates = [response.data.latitude, response.data.longitude];
    } else {
      resolvedCoordinates = coordinates;
    }

    // Criar usuário no banco de dados
    const user = await UserModel.create({ name, email, address, coordinates: resolvedCoordinates });
    
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { name, email, address, coordinates } = req.body;

    // Verificar se o usuário existe
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validar se apenas endereço ou coordenadas são fornecidos, não ambos ou nenhum
    if ((address && coordinates) || (!address && !coordinates)) {
      return res.status(400).json({ message: 'Provide either address or coordinates, not both or none.' });
    }

    // Se fornecido endereço, resolver coordenadas usando a API do IPstack (ou seu serviço real)
    let resolvedCoordinates: [number, number] | undefined;
    if (address) {
      const geoLocationServiceUrl = `${IPSTACK_API_URL}${encodeURIComponent(address)}?access_key=${IPSTACK_API_KEY}`;
      const response = await axios.get(geoLocationServiceUrl);
      resolvedCoordinates = [response.data.latitude, response.data.longitude];
    } else {
      resolvedCoordinates = coordinates;
    }

    // Atualizar dados do usuário no banco de dados
    existingUser.name = name || existingUser.name;
    existingUser.email = email || existingUser.email;
    existingUser.address = address || existingUser.address;
    existingUser.coordinates = resolvedCoordinates || existingUser.coordinates;

    const updatedUser = await existingUser.save();

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Verificar se o usuário existe
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remover usuário do banco de dados
    await existingUser.deleteOne();

    return res.status(204).json(); // 204 significa "No Content"
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Recuperar informações do usuário pelo ID
    const user = await UserModel.findById(userId);

    // Verificar se o usuário existe
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
