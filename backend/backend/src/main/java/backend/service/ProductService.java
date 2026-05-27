package backend.service;

import java.util.List;

import backend.dto.ProductRequest;
import backend.model.Product;
import backend.model.Vendor;
import backend.repository.ProductRepository;
import backend.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private VendorRepository vendorRepository;

    public Product addProduct(ProductRequest request) {

        Vendor vendor = vendorRepository.findById(request.getVendorId()).orElse(null);

        if (vendor == null) {
            return null;
        }

        Product product = new Product();

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());
        product.setVendor(vendor);

        return productRepository.save(product);
    }

    public List<Product> getProductsByVendor(Long vendorId) {
        return productRepository.findByVendorId(vendorId);
    }
    public Product updateProduct(Long productId, ProductRequest request) {

        Product product = productRepository.findById(productId).orElse(null);

        if (product == null) {
            return null;
        }

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());

        return productRepository.save(product);
    }
    public String deleteProduct(Long productId) {

        Product product = productRepository.findById(productId).orElse(null);

        if (product == null) {
            return "Product not found";
        }

        productRepository.delete(product);

        return "Product deleted successfully";
    }
}