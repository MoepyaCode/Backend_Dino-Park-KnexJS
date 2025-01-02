/* Manages events that affect Dino and Zones */

declare enum EventTypes {
    MAINTENANCE_PERFORMED = 'maintenance_performed',
    DINO_ADDED = 'dino_added',
    DINO_LOCATION_UPDATED = 'dino_location_updated',
    DINO_FED = 'dino_fed',
    DINO_REMOVED = 'dino_removed',
}

declare interface EventI {
    
}