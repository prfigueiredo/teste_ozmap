
import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, address, coordinates } = req.body;

    // Validar se nome e email estão presentes
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    // Validar se apenas endereço ou coordenadas são fornecidos, não ambos
    if ((address && coordinates) || (!address && !coordinates)) {
      return res.status(400).json({ message: 'Provide either address or coordinates, not both or none.' });
    }

    // Se fornecido endereço, resolver coordenadas usando um serviço de geolocalização (simulado aqui)
    let resolvedCoordinates: [number, number] | undefined;
    if (address) {
      // Aqui você pode chamar um serviço real de geolocalização
      // Por enquanto, simulamos com coordenadas fixas
      resolvedCoordinates = [10.1234, 20.5678];
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

    // Se fornecido endereço, resolver coordenadas usando um serviço de geolocalização (simulado aqui)
    let resolvedCoordinates: [number, number] | undefined;
    if (address) {
      // Aqui você pode chamar um serviço real de geolocalização
      // Por enquanto, simulamos com coordenadas fixas
      resolvedCoordinates = [10.1234, 20.5678];
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

