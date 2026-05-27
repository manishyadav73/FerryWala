package backend.service;
import java.util.List;
import backend.dto.VendorRequest;
import backend.model.User;
import backend.model.Vendor;
import backend.repository.UserRepository;
import backend.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private UserRepository userRepository;

    public Vendor createVendor(VendorRequest request) {

        User user = userRepository.findById(request.getUserId()).orElse(null);

        if (user == null) {
            return null;
        }

        Vendor vendor = new Vendor();

        vendor.setShopName(request.getShopName());
        vendor.setCategory(request.getCategory());
        vendor.setLatitude(request.getLatitude());
        vendor.setLongitude(request.getLongitude());
        vendor.setAddress(request.getAddress());
        vendor.setUser(user);

        return vendorRepository.save(vendor);
    }
    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }
    public List<Vendor> getNearbyVendors(
            Double userLat,
            Double userLng,
            Double radiusKm) {

        List<Vendor> allVendors = vendorRepository.findAll();

        return allVendors.stream()
                .filter(vendor -> {

                    double distance = calculateDistance(
                            userLat,
                            userLng,
                            vendor.getLatitude(),
                            vendor.getLongitude()
                    );

                    return distance <= radiusKm;
                })
                .toList();
    }
    private double calculateDistance(
            double lat1,
            double lon1,
            double lat2,
            double lon2) {

        double earthRadius = 6371;

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2)
                        + Math.cos(Math.toRadians(lat1))
                        * Math.cos(Math.toRadians(lat2))
                        * Math.sin(dLon / 2)
                        * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadius * c;
    }
    public List<Vendor> getNearbyVendorsByCategory(
            Double userLat,
            Double userLng,
            Double radiusKm,
            String category) {

        List<Vendor> allVendors = vendorRepository.findAll();

        return allVendors.stream()
                .filter(vendor -> {

                    double distance = calculateDistance(
                            userLat,
                            userLng,
                            vendor.getLatitude(),
                            vendor.getLongitude()
                    );

                    boolean categoryMatch =
                            vendor.getCategory().equalsIgnoreCase(category);

                    return distance <= radiusKm && categoryMatch;
                })
                .toList();
    }
}