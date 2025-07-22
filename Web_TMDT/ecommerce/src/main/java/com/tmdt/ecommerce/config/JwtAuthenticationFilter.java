package com.tmdt.ecommerce.config;

import com.tmdt.ecommerce.service.CustomUserDetailsService;
import com.tmdt.ecommerce.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.logging.Logger;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger logger = Logger.getLogger(JwtAuthenticationFilter.class.getName());

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        logger.info("Processing request: " + path);

        // ✅ Bỏ qua JWT cho các URL public (permitAll)
        if (path.startsWith("/api/auth") ||
                path.startsWith("/api/sanpham") ||
                path.startsWith("/api/variants") ||
                path.startsWith("/api/danhmuc") ||
                path.startsWith("/images") ||
                path.startsWith("/products") ||
                path.startsWith("/api/upload")
        ){
            logger.info("Skipping JWT validation for: " + path);

            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");
        logger.info("Authorization header: " + authHeader);
        String jwt = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwt);
                logger.info("Extracted username from JWT: " + username);
            } catch (Exception e) {
                logger.warning("Không thể trích xuất username từ JWT: " + e.getMessage());
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            logger.info("Authorities for " + username + ": " + userDetails.getAuthorities());


            if (jwtUtil.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
                logger.info("✅ Đã xác thực và set quyền cho user: " + username);
            } else {
                logger.warning("JWT token không hợp lệ cho user: " + username);
            }
        } else {
            logger.warning("No valid Bearer token found or authentication already set");
        }

        filterChain.doFilter(request, response);
    }

}
