import { OperationalSetting, OperationalSettingEvent, Order, OrderEvent } from '@enigma-laboratory/shared';
import { OperationalSettingService, OrderService } from 'stores';
import { EventHandler } from './SocketIOService';

/**
 * Object: orderEventHandlers
 * Description: Event handlers for order-related events.
 * Each event type (created, updated, deleted) corresponds to a specific action on orders.
 */
export const orderEventHandlers: EventHandler<Order> = {
  // Handle creation of orders with input/output operations
  [OrderEvent.CREATED]: OrderService.instance.createdOrderWithIO,
  // Handle update of orders with input/output operations
  [OrderEvent.UPDATED]: OrderService.instance.updatedOrderWithIO,
  // Handle deletion of orders with input/output operations
  [OrderEvent.DELETED]: OrderService.instance.deletedOrderWithIO,
};

/**
 * Object: operationalSettingEventHandlers
 * Description: Event handlers for operational setting-related events.
 * Each event type (created, updated, deleted) corresponds to a specific action on operational settings.
 */
export const operationalSettingEventHandlers: EventHandler<OperationalSetting> = {
  // Handle creation of operational settings with input/output operations
  [OperationalSettingEvent.CREATED]: OperationalSettingService.instance.createdOperationalSettingIO,
  // Handle update of operational settings with input/output operations
  [OperationalSettingEvent.UPDATED]: OperationalSettingService.instance.updatedOperationalSettingIO,
  // Handle deletion of operational settings with input/output operations
  [OperationalSettingEvent.DELETED]: OperationalSettingService.instance.deletedOperationalSettingIO,
};
