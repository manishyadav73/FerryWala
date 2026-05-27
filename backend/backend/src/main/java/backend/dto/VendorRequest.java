package backend.dto;

import lombok.Data;

@Data
public class VendorRequest {

    private String shopName;
    private String category;
    private Double latitude;
    private Double longitude;
    private String address;
    private Long userId;
}