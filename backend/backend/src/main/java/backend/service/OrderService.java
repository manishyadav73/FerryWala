package backend.service;

import backend.model.Order;
import backend.repository.OrderRepository;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    private final SimpMessagingTemplate messagingTemplate;

    public OrderService(
            OrderRepository orderRepository,
            SimpMessagingTemplate messagingTemplate
    ) {

        this.orderRepository = orderRepository;
        this.messagingTemplate = messagingTemplate;
    }

    // PLACE ORDER
    public Order placeOrder(Order order) {

        Order savedOrder = orderRepository.save(order);

        // SEND REALTIME UPDATE
        messagingTemplate.convertAndSend(
                "/topic/orders",
                savedOrder
        );

        return savedOrder;
    }

    // GET USER ORDERS
    public List<Order> getUserOrders(Long userId) {

        return orderRepository.findByUserId(userId);
    }
}