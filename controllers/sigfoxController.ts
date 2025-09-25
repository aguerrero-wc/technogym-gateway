// controllers/sigfoxController.ts

import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { SigfoxCallbackPayload, SigfoxCallbackQuery } from '../types/sigfox';

const prisma = new PrismaClient();

export const handleSigfoxCallback = async (req: Request, res: Response) => {
  try {
    // Extraer query parameters
    const { time, seqNumber } = req.query as SigfoxCallbackQuery;
    
    // Extraer body
    const payload = req.body as SigfoxCallbackPayload;
    
    console.log('Received Sigfox callback:', {
      time,
      seqNumber,
      device: payload.device,
      messageType: payload.messageType
    });

    // Validaciones básicas
    if (!time || !seqNumber) {
      return res.status(400).json({
        error: 'Missing required query parameters: time and seqNumber'
      });
    }

    if (!payload.device || !payload.data) {
      return res.status(400).json({
        error: 'Missing required payload fields: device and data'
      });
    }

    // Crear el registro en la base de datos
    const callback = await prisma.sigfoxCallback.create({
      data: {
        // Query parameters
        time: time,
        seqNumber: seqNumber,
        
        // Payload data
        clientId: payload.clientId,
        messageType: payload.messageType,
        deviceType: payload.deviceType,
        device: payload.device,
        data: payload.data,
        lqi: payload.lqi,
        linkQuality: payload.linkQuality,
        operatorName: payload.operatorName,
        countryCode: payload.countryCode,
        deviceTypeId: payload.deviceTypeId,
        
        // Location data (puede ser null)
        latitude: payload.computedLocation?.lat,
        longitude: payload.computedLocation?.lng,
        radius: payload.computedLocation?.radius,
        locationSource: payload.computedLocation?.source,
        locationStatus: payload.computedLocation?.status,
        
        // Crear duplicates relacionados
        duplicates: {
          create: payload.duplicates?.map(duplicate => ({
            bsId: duplicate.bsId,
            rssi: duplicate.rssi,
            nbRep: duplicate.nbRep
          })) || []
        }
      },
      include: {
        duplicates: true
      }
    });

    console.log('Sigfox callback saved successfully:', callback.id);
    
    // Respuesta exitosa (Sigfox espera un 200)
    res.status(200).json({
      success: true,
      id: callback.id,
      message: 'Callback processed successfully'
    });

  } catch (error) {
    console.error('Error processing Sigfox callback:', error);
    
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};