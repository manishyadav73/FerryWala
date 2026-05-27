package backend.controller;

import backend.model.Order;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

import org.springframework.stereotype.Controller;

@Controller
public class OrderSocketController {

    @MessageMapping("/order")

    @SendTo("/topic/orders")

    public Order sendOrder(Order order) {

        System.out.println(
                "📦 Realtime Order Received: "
                        + order
        );

        return order;
    }
}