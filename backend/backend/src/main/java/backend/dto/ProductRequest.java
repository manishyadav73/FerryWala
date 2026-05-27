package backend.dto;

import lombok.Data;

@Data
public class ProductRequest {

    private String name;
    private Double price;
    private Integer quantity;
    private String category;
    private String imageUrl;
    private Long vendorId;
}