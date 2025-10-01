// services/firebaseService.ts
import * as admin from 'firebase-admin';

const serviceAccount = require('../technogym-firebase.json');

// Inicializa Firebase Admin solo una vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// ============================================
// FUNCIONES GENÉRICAS
// ============================================

/**
 * Consulta todos los documentos en una colección específica.
 */
async function getAllDocuments(collectionName: string): Promise<any[]> {
  try {
    const collectionRef = db.collection(collectionName);
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
      console.log(`No se encontraron documentos en la colección ${collectionName}.`);
      return [];
    }

    const documents: any[] = [];
    snapshot.forEach(doc => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (error) {
    console.error(`Error al obtener documentos de ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Consulta un documento específico por ID.
 */
async function getDocumentById(collectionName: string, documentId: string): Promise<any | null> {
  try {
    const docRef = db.collection(collectionName).doc(documentId);
    const doc = await docRef.get();

    if (!doc.exists) {
      console.log(`No se encontró el documento con ID: ${documentId} en ${collectionName}`);
      return null;
    }

    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error(`Error al obtener documento de ${collectionName}:`, error);
    throw error;
  }
}

// ============================================
// DEVICE
// ============================================

export async function getFirebaseDevices(): Promise<any[]> {
  console.log('Obteniendo devices de Firebase');
  return getAllDocuments('Device');
}

export async function getFirebaseDeviceById(deviceId: string): Promise<any | null> {
  return getDocumentById('Device', deviceId);
}

// ============================================
// CONTAINER TYPE
// ============================================

export async function getFirebaseContainerTypes(): Promise<any[]> {
  console.log('Obteniendo container types de Firebase');
  return getAllDocuments('ContainerType');
}

export async function getFirebaseContainerTypeById(containerTypeId: string): Promise<any | null> {
  return getDocumentById('ContainerType', containerTypeId);
}

// ============================================
// DEVICE COUNTER
// ============================================

export async function getFirebaseDeviceCounters(): Promise<any[]> {
  console.log('Obteniendo device counters de Firebase');
  return getAllDocuments('DeviceCounter');
}

export async function getFirebaseDeviceCounterById(deviceCounterId: string): Promise<any | null> {
  return getDocumentById('DeviceCounter', deviceCounterId);
}

// Obtener contadores por deviceId
export async function getFirebaseDeviceCountersByDevice(deviceId: string): Promise<any[]> {
  try {
    const countersRef = db.collection('DeviceCounter');
    const snapshot = await countersRef.where('deviceId', '==', deviceId).get();

    if (snapshot.empty) {
      return [];
    }

    const counters: any[] = [];
    snapshot.forEach(doc => {
      counters.push({ id: doc.id, ...doc.data() });
    });

    return counters;
  } catch (error) {
    console.error('Error al obtener device counters por deviceId:', error);
    throw error;
  }
}

// ============================================
// DEVICE HISTORY
// ============================================

export async function getFirebaseDeviceHistory(): Promise<any[]> {
  console.log('Obteniendo device history de Firebase');
  return getAllDocuments('DeviceHistory');
}

export async function getFirebaseDeviceHistoryById(historyId: string): Promise<any | null> {
  return getDocumentById('DeviceHistory', historyId);
}

// Obtener historial por deviceId
export async function getFirebaseDeviceHistoryByDevice(deviceId: string): Promise<any[]> {
  try {
    const historyRef = db.collection('DeviceHistory');
    const snapshot = await historyRef
      .where('deviceId', '==', deviceId)
      .orderBy('timestamp', 'desc')
      .get();

    if (snapshot.empty) {
      return [];
    }

    const history: any[] = [];
    snapshot.forEach(doc => {
      history.push({ id: doc.id, ...doc.data() });
    });

    return history;
  } catch (error) {
    console.error('Error al obtener device history por deviceId:', error);
    throw error;
  }
}

// ============================================
// LOCATION
// ============================================

export async function getFirebaseLocations(): Promise<any[]> {
  console.log('Obteniendo locations de Firebase');
  return getAllDocuments('Location');
}

export async function getFirebaseLocationById(locationId: string): Promise<any | null> {
  return getDocumentById('Location', locationId);
}

// ============================================
// STOCK
// ============================================

export async function getFirebaseStock(): Promise<any[]> {
  console.log('Obteniendo stock de Firebase');
  return getAllDocuments('Stock');
}

export async function getFirebaseStockById(stockId: string): Promise<any | null> {
  return getDocumentById('Stock', stockId);
}

// Obtener stock por locationId
export async function getFirebaseStockByLocation(locationId: string): Promise<any[]> {
  try {
    const stockRef = db.collection('Stock');
    const snapshot = await stockRef.where('locationId', '==', locationId).get();

    if (snapshot.empty) {
      return [];
    }

    const stock: any[] = [];
    snapshot.forEach(doc => {
      stock.push({ id: doc.id, ...doc.data() });
    });

    return stock;
  } catch (error) {
    console.error('Error al obtener stock por locationId:', error);
    throw error;
  }
}

// ============================================
// STOCK HISTORY
// ============================================

export async function getFirebaseStockHistory(): Promise<any[]> {
  console.log('Obteniendo stock history de Firebase');
  return getAllDocuments('StockHistory');
}

export async function getFirebaseStockHistoryById(historyId: string): Promise<any | null> {
  return getDocumentById('StockHistory', historyId);
}

// Obtener historial por stockId
export async function getFirebaseStockHistoryByStock(stockId: string): Promise<any[]> {
  try {
    const historyRef = db.collection('StockHistory');
    const snapshot = await historyRef
      .where('stockId', '==', stockId)
      .orderBy('timestamp', 'desc')
      .get();

    if (snapshot.empty) {
      return [];
    }

    const history: any[] = [];
    snapshot.forEach(doc => {
      history.push({ id: doc.id, ...doc.data() });
    });

    return history;
  } catch (error) {
    console.error('Error al obtener stock history por stockId:', error);
    throw error;
  }
}

// Exportar la instancia de Firestore por si se necesita acceso directo
export { db };