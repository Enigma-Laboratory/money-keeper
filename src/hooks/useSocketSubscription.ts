import { OperationalSetting, OperationalSettingEvent, Order, OrderEvent, User } from '@enigma-laboratory/shared';
import { useEffect } from 'react';
import { EventHandler, socket } from 'services';
import { OperationalSettingService, OrderService } from 'stores';

/**
 * Object: operationalSettingEventHandlers
 * Description: Event handlers for operational setting-related events.
 * Each event type (created, updated, deleted) corresponds to a specific action on operational settings.
 */

export const useSocketSubscription = <T>(eventHandlers: EventHandler<T>[]): void => {
  const orderEventHandlers: EventHandler<Order> = {
    // Handle creation of orders with input/output operations
    [OrderEvent.CREATED]: OrderService.instance.createdOrderWithIO,
    // Handle update of orders with input/output operations
    [OrderEvent.UPDATED]: OrderService.instance.updatedOrderWithIO,
    // Handle deletion of orders with input/output operations
    [OrderEvent.DELETED]: OrderService.instance.deletedOrderWithIO,
  };

  const orderStatusEventHandlers: EventHandler<{ user: User; orders: Order[] }> = {
    [OrderEvent.ALL_UPDATED]: OrderService.instance.updateManyOrderStatus,
  };

  const operationalSettingEventHandlers: EventHandler<OperationalSetting> = {
    // Handle creation of operational settings with input/output operations
    [OperationalSettingEvent.CREATED]: OperationalSettingService.instance.createdOperationalSettingIO,
    // Handle update of operational settings with input/output operations
    [OperationalSettingEvent.UPDATED]: OperationalSettingService.instance.updatedOperationalSettingIO,
    // Handle deletion of operational settings with input/output operations
    [OperationalSettingEvent.DELETED]: OperationalSettingService.instance.deletedOperationalSettingIO,
  };

  useEffect(() => {
    socket.onEventListeners([
      ...eventHandlers,
      orderEventHandlers,
      operationalSettingEventHandlers,
      orderStatusEventHandlers,
    ]);
    return () => {
      socket.offEventListeners([
        ...eventHandlers,
        orderEventHandlers,
        operationalSettingEventHandlers,
        orderStatusEventHandlers,
      ]);
    };
  }, [eventHandlers]);
};
