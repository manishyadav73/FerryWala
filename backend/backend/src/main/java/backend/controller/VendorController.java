package backend.controller;
import java.util.List;
import backend.dto.VendorRequest;
import backend.model.Vendor;
import backend.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/vendors")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    @PostMapping("/create")
    public Vendor createVendor(@RequestBody VendorRequest request) {
        return vendorService.createVendor(request);
    }
    @GetMapping("/all")
    public List<Vendor> getAllVendors() {
        return vendorService.getAllVendors();
    }
    @GetMapping("/nearby")
    public List<Vendor> getNearbyVendors(
            @RequestParam Double lat,
            @RequestParam Double lng,
            @RequestParam Double radius) {

        return vendorService.getNearbyVendors(lat, lng, radius);
    }
    @GetMapping("/nearby/category")
    public List<Vendor> getNearbyVendorsByCategory(
            @RequestParam Double lat,
            @RequestParam Double lng,
            @RequestParam Double radius,
            @RequestParam String category) {

        return vendorService.getNearbyVendorsByCategory(
                lat,
                lng,
                radius,
                category
        );
    }
}