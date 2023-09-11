package com.ssafy.cartel.dto;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class FindPassword {

    @Email
    private String email;
}
