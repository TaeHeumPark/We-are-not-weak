package com.ssafy.cartel.dto;

import com.ssafy.cartel.repository.CareerRepository;
import lombok.Getter;

import java.util.List;

@Getter
public class CounselorSignupRequest {
    private UserDto userDto;
    private CounselorDto counselorDto;
    private List<CareerDto> careersDto;

}
