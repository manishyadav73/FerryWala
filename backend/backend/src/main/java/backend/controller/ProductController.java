package backend.controller;
import java.util.List;
import backend.dto.ProductRequest;
import backend.model.Product;
import backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public Product addProduct(@RequestBody ProductRequest request) {
        return productService.addProduct(request);
    }
    @GetMapping("/vendor/{vendorId}")
    public List<Product> getVendorProducts(@PathVariable Long vendorId) {
        return productService.getProductsByVendor(vendorId);
    }
    @PutMapping("/update/{productId}")
    public Product updateProduct(
            @PathVariable Long productId,
            @RequestBody ProductRequest request) {

        return productService.updateProduct(productId, request);
    }
    @DeleteMapping("/delete/{productId}")
    public String deleteProduct(@PathVariable Long productId) {
        return productService.deleteProduct(productId);
    }
}