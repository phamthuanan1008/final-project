package com.example.fashion.controller;

import com.example.fashion.DTO.*;
import com.example.fashion.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
public class AccountController {


    @Autowired
    private UserService userService;

    @Operation(summary = "Đăng nhập")
    @PostMapping("/login")
    private ResponseEntity<BaseResponse<JWTResponse>> loginUser(@Valid @RequestBody LoginRequest loginRequest){
        BaseResponse<JWTResponse> baseResponse = userService.loginUser(loginRequest);
        return new ResponseEntity<>(baseResponse, HttpStatus.valueOf(baseResponse.getCode()));
    }


    @Operation(summary = "Xác thực người dùng")
    @GetMapping("/active")
    private ResponseEntity<BaseResponse<UserDTO>> loginUser(@RequestParam("userId") Long userId,
                                                                @RequestParam("codeActive") String codeActive){
        BaseResponse<UserDTO> baseResponse = userService.activeUser(userId, codeActive);
        return new ResponseEntity<>(baseResponse, HttpStatus.valueOf(baseResponse.getCode()));
    }

    @Operation(summary = "Đăng ký người dùng")
    @PostMapping("/register")
    private ResponseEntity<BaseResponse<Map<String, String>>> registerUser(@Valid @RequestBody RegisterRequest registerRequest){
        BaseResponse<Map<String, String>> baseResponse = userService.registerUser(registerRequest);
        return new ResponseEntity<>(baseResponse, HttpStatus.valueOf(baseResponse.getCode()));
    }

}
