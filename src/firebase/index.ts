'use client';

/**
 * @fileOverview Point d'entrée centralisé pour les services Firebase.
 * Exportation ordonnée pour éviter les dépendances circulaires.
 */

export * from './init';
export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
