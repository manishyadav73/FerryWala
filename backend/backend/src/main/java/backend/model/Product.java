package backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double price;

    private Integer quantity;

    private String category;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;
}