// routes/firebaseRoutes.ts
import { Router } from 'express';
import * as firebaseController from '../controllers/firebaseController';

const router = Router();

// ============================================
// DEVICE ROUTES
// ============================================
router.get('/firebase/devices', firebaseController.listFirebaseDevices);
router.get('/firebase/devices/:id', firebaseController.getFirebaseDevice);

// ============================================
// CONTAINER TYPE ROUTES
// ============================================
router.get('/firebase/container-types', firebaseController.listFirebaseContainerTypes);
router.get('/firebase/container-types/:id', firebaseController.getFirebaseContainerType);

// ============================================
// DEVICE COUNTER ROUTES
// ============================================
// Soporta query param: ?deviceId=xxx para filtrar por device
router.get('/firebase/device-counters', firebaseController.listFirebaseDeviceCounters);
router.get('/firebase/device-counters/:id', firebaseController.getFirebaseDeviceCounter);

// ============================================
// DEVICE HISTORY ROUTES
// ============================================
// Soporta query param: ?deviceId=xxx para filtrar por device
router.get('/firebase/device-history', firebaseController.listFirebaseDeviceHistory);
router.get('/firebase/device-history/:id', firebaseController.getFirebaseDeviceHistoryById);

// ============================================
// LOCATION ROUTES
// ============================================
router.get('/firebase/locations', firebaseController.listFirebaseLocations);
router.get('/firebase/locations/:id', firebaseController.getFirebaseLocation);

// ============================================
// STOCK ROUTES
// ============================================
// Soporta query param: ?locationId=xxx para filtrar por location
router.get('/firebase/stock', firebaseController.listFirebaseStock);
router.get('/firebase/stock/:id', firebaseController.getFirebaseStock);

// ============================================
// STOCK HISTORY ROUTES
// ============================================
// Soporta query param: ?stockId=xxx para filtrar por stock
router.get('/firebase/stock-history', firebaseController.listFirebaseStockHistory);
router.get('/firebase/stock-history/:id', firebaseController.getFirebaseStockHistoryById);

export default router;