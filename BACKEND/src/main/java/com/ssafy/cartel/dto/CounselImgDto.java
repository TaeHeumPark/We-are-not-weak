package com.ssafy.cartel.dto;

import com.ssafy.cartel.domain.Counsel;
import com.ssafy.cartel.domain.CounselImg;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 필드값을 파라미터로 받는 생성자
@Getter
@Builder
public class CounselImgDto {

    private Integer counselImgId;
    private String imgUrl;
    private Integer state;
    private Integer counselId;

    public CounselImg toEntity(Counsel counsel){
        return CounselImg.builder()
                .counselImgId(counselImgId)
                .imgUrl(imgUrl)
                .state(state)
                .counselId(counsel)
                .build();
    }


}
