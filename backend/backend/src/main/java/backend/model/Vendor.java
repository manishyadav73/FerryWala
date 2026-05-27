package backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "vendors")
@Data
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String shopName;

    private String category;

    private Double latitude;

    private Double longitude;

    private String address;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}