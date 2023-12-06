
import { Request, Response } from 'express';
import { RegionModel } from '../models/region.model';

export const createRegion = async (req: Request, res: Response) => {
  try {
    const { name, coordinates, ownerId } = req.body;

    // Validar se todos os campos necessários foram fornecidos
    if (!name || !coordinates || !ownerId) {
      return res.status(400).json({ message: 'Name, coordinates, and ownerId are required.' });
    }

    // Criar região no banco de dados
    const region = await RegionModel.create({ name, coordinates, owner: ownerId });

    return res.status(201).json(region);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateRegion = async (req: Request, res: Response) => {
  try {
    const regionId = req.params.regionId;
    const { name, coordinates, ownerId } = req.body;

    // Verificar se a região existe
    const existingRegion = await RegionModel.findById(regionId);
    if (!existingRegion) {
      return res.status(404).json({ message: 'Region not found' });
    }

    // Validar se todos os campos necessários foram fornecidos
    if (!name || !coordinates || !ownerId) {
      return res.status(400).json({ message: 'Name, coordinates, and ownerId are required.' });
    }

    // Atualizar dados da região no banco de dados
    existingRegion.name = name;
    existingRegion.coordinates = coordinates;
    existingRegion.owner = ownerId;

    const updatedRegion = await existingRegion.save();

    return res.status(200).json(updatedRegion);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  };

export const deleteRegion = async (req: Request, res: Response) => {
  try {
    const regionId = req.params.regionId;

    // Verificar se a região existe
    const existingRegion = await RegionModel.findById(regionId);
    if (!existingRegion) {
      return res.status(404).json({ message: 'Region not found' });
    }

    // Remover a região do banco de dados
    await existingRegion.deleteOne();

    return res.status(204).json(); // 204 significa "No Content"
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  };

export const getRegion = async (req: Request, res: Response) => {
  try {
    const regionId = req.params.regionId;

    // Recuperar informações da região pelo ID
    const region = await RegionModel.findById(regionId);

    // Verificar se a região existe
    if (!region) {
      return res.status(404).json({ message: 'Region not found' });
    }

    return res.status(200).json(region);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  };    