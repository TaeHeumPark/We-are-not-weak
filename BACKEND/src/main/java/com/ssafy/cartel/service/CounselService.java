package com.ssafy.cartel.service;

import com.ssafy.cartel.domain.Client;
import com.ssafy.cartel.domain.Counsel;
import com.ssafy.cartel.domain.Counselor;
import com.ssafy.cartel.dto.CounselDto;
import com.ssafy.cartel.dto.CounselResDto;
import com.ssafy.cartel.repository.ClientRepository;
import com.ssafy.cartel.repository.CounselRepository;
import com.ssafy.cartel.repository.CounselorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor //final , @notnull 붙은 필드의 생성자 추가
@Service //빈으로 등록
public class CounselService {
    private final CounselRepository counselRepository;
    private final CounselorRepository counselorRepository;
    private final ClientRepository clientRepository;

    @Transactional
    public Counsel save(CounselDto counselDto){
        Counselor counselor = counselorRepository.findById(counselDto.getCounselorId()).orElseThrow();
        return counselRepository.save(counselDto.toEntity(counselor));
    }

    public List<CounselResDto> findAll(){
        List<Counsel> counsel = counselRepository.findAll();
        List<CounselResDto> counselResDtoList = new ArrayList<>();

        for (int i = 0; i < counsel.size(); i++) {
            CounselResDto counselResDto = CounselResDto.builder()
                    .counselId(counsel.get(i).getId())
                    .startDate(counsel.get(i).getStartDate())
                    .endDate(counsel.get(i).getEndDate())
                    .counselorId(counsel.get(i).getCounselorId().getId())
                    .counselCount(counsel.get(i).getCounselCount())
                    .clientCount(counsel.get(i).getClientCount())
                    .introduction(counsel.get(i).getIntroduction())
                    .price(counsel.get(i).getPrice())
                    .state(counsel.get(i).getState())
                    .title(counsel.get(i).getTitle())
                    .weekCount(counsel.get(i).getWeekCount())
                    .minClient(counsel.get(i).getMinClient())
                    .maxClient(counsel.get(i).getMaxClient())
                    .counselorName(counsel.get(i).getCounselorId().getUser().getName())
                    .build();

            counselResDtoList.add(counselResDto);
        }
        return counselResDtoList;
    }

    public CounselResDto findById(Integer id){
        Counsel counsel = counselRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found:" + id));
        CounselResDto counselResDto = CounselResDto.builder()
                .counselId(counsel.getId())
                .startDate(counsel.getStartDate())
                .endDate(counsel.getEndDate())
                .counselorId(counsel.getCounselorId().getId())
                .counselCount(counsel.getCounselCount())
                .clientCount(counsel.getClientCount())
                .introduction(counsel.getIntroduction())
                .price(counsel.getPrice())
                .state(counsel.getState())
                .title(counsel.getTitle())
                .weekCount(counsel.getWeekCount())
                .minClient(counsel.getMinClient())
                .maxClient(counsel.getMaxClient())
                .counselorName(counsel.getCounselorId().getUser().getName())
                .build();
        return counselResDto;
    }

    @Transactional
    public Counsel update(Integer id, CounselDto counselDto){
        Counsel counsel = counselRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("not found:" + id));

        counsel.updateState(counselDto.getState());
        return counsel;
    }
    @Transactional
    public void delete(Integer id){
        counselRepository.deleteById(id);
    }


    public Counsel findByCounselId(Integer id) {
        Counsel counsel = counselRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found:" + id));
        return counsel;

    }
    public List<Client> findByCounsel(Counsel counsel){
        List<Client> clients = clientRepository.findAllByCounselId(counsel);
        return clients;
    }


}
