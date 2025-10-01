// controllers/firebaseController.ts
import { Request, Response } from 'express';
import * as firebaseService from '../services/firebaseService';

// ============================================
// DEVICE CONTROLLERS
// ============================================

export const listFirebaseDevices = async (req: Request, res: Response) => {
  try {
    const devices = await firebaseService.getFirebaseDevices();
    res.status(200).json({
      success: true,
      count: devices.length,
      data: devices
    });
  } catch (error) {
    console.error('Error en listFirebaseDevices:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener devices de Firebase',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getFirebaseDevice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const device = await firebaseService.getFirebaseDeviceById(id);
    
    if (!device) {
      return res.status(404).json({
        success: false,
        error: 'Device no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: device
    });
  } catch (error) {
    console.error('Error en getFirebaseDevice:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener device de Firebase',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// ============================================
// CONTAINER TYPE CONTROLLERS
// ============================================

export const listFirebaseContainerTypes = async (req: Request, res: Response) => {
  try {
    const containerTypes = await firebaseService.getFirebaseContainerTypes();
    res.status(200).json({
      success: true,
      count: containerTypes.length,
      data: containerTypes
    });
  } catch (error) {
    console.error('Error en listFirebaseContainerTypes:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener container types de Firebase',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getFirebaseContainerType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const containerType = await firebaseService.getFirebaseContainerTypeById(id);
    
    if (!containerType) {
      return res.status(404).json({
        success: false,
        error: 'Container Type no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: containerType
    });
  } catch (error) {
    console.error('Error en getFirebaseContainerType:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener container type de Firebase',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// ============================================
// DEVICE COUNTER CONTROLLERS
// ============================================

export const listFirebaseDeviceCounters = async (req: Request, res: Response) => {
  try {
    const { deviceId } = req.query;
    
    let counters;
    if (deviceId && typeof deviceId === 'string') {
      counters = await firebaseService.getFirebaseDeviceCountersByDevice(deviceId);
    } else {
      counters = await firebaseService.getFirebaseDeviceCounters();
    }
    
    res.status(200).json({
      success: true,
      count: counters.length,
      data: counters
    });
  } catch (error) {
    console.error('Error en listFirebaseDeviceCounters:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener device counters de Firebase',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getFirebaseDeviceCounter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const counter = await firebaseService.getFirebaseDeviceCounterById(id);
    
    if (!counter) {
      return res.status(404).json({
        success: false,
        error: 'Device Counter no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: counter
    });
  } catch (error) {
    console.error('Error en getFirebaseDeviceCounter:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener device counter de Firebase',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// ============================================
// DEVICE HISTORY CONTROLLERS
// ============================================

export const listFirebaseDeviceHistory = async (req: Request, res: Response) => {
  try {
    const { deviceId } = req.query;
    
    let history;
    if (deviceId && typeof deviceId === 'string') {
      history = await firebaseService.getFirebaseDeviceHistoryByDevice(deviceId);
    } else {
      history = await firebaseService.getFirebaseDeviceHistory();
    }
    
    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    console.error('Error en listFirebaseDeviceHistory:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener device history de Firebase',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getFirebaseDeviceHistoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const history = await firebaseService.getFirebaseDeviceHistoryById(id);
    
    if (!history) {
      return res.status(404).json({
        success: false,
        error: 'Device History no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    console.error('Error en getFirebaseDeviceHistoryById:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener device history de Firebase',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// ============================================
// LOCATION CONTROLLERS
// ============================================

export const listFirebaseLocations = async (req: Request, res: Response) => {
  try {
    const locations = await firebaseService.getFirebaseLocations();
    res.status(200).json({
      success: true,
      count: locations.length,
      data: locations
    });
  } catch (error) {
    console.error('Error en listFirebaseLocations:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener locations de Firebase',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getFirebaseLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const location = await firebaseService.getFirebaseLocationById(id);
    
    if (!location) {
      return res.status(404).json({
        success: false,
        error: 'Location no encontrada'
      });
    }
    
    res.status(200).json({
      success: true,
      data: location
    });
  } catch (error) {
    console.error('Error en getFirebaseLocation:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener location de Firebase',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// ============================================
// STOCK CONTROLLERS
// ============================================

export const listFirebaseStock = async (req: Request, res: Response) => {
  try {
    const { locationId } = req.query;
    
    let stock;
    if (locationId && typeof locationId === 'string') {
      stock = await firebaseService.getFirebaseStockByLocation(locationId);
    } else {
      stock = await firebaseService.getFirebaseStock();
    }
    
    res.status(200).json({
      success: true,
      count: stock.length,
      data: stock
    });
  } catch (error) {
    console.error('Error en listFirebaseStock:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener stock de Firebase',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getFirebaseStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stock = await firebaseService.getFirebaseStockById(id);
    
    if (!stock) {
      return res.status(404).json({
        success: false,
        error: 'Stock no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: stock
    });
  } catch (error) {
    console.error('Error en getFirebaseStock:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener stock de Firebase',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// ============================================
// STOCK HISTORY CONTROLLERS
// ============================================

export const listFirebaseStockHistory = async (req: Request, res: Response) => {
  try {
    const { stockId } = req.query;
    
    let history;
    if (stockId && typeof stockId === 'string') {
      history = await firebaseService.getFirebaseStockHistoryByStock(stockId);
    } else {
      history = await firebaseService.getFirebaseStockHistory();
    }
    
    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    console.error('Error en listFirebaseStockHistory:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener stock history de Firebase',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getFirebaseStockHistoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const history = await firebaseService.getFirebaseStockHistoryById(id);
    
    if (!history) {
      return res.status(404).json({
        success: false,
        error: 'Stock History no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    console.error('Error en getFirebaseStockHistoryById:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener stock history de Firebase',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};