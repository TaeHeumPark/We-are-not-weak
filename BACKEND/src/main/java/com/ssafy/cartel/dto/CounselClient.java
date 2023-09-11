package com.ssafy.cartel.dto;

import com.ssafy.cartel.domain.Client;
import com.ssafy.cartel.domain.Curriculum;
import lombok.Getter;

@Getter
public class CounselClient {
    private Integer userId;

    public CounselClient(Client client) {
        this.userId = client.getUserId().getId();
    }
}
