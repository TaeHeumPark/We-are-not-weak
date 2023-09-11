package com.ssafy.cartel.service;

import com.ssafy.cartel.domain.Client;
import com.ssafy.cartel.domain.Counsel;
import com.ssafy.cartel.domain.User;
import com.ssafy.cartel.dto.ClientDto;
import com.ssafy.cartel.dto.PaymentDto;
import com.ssafy.cartel.dto.UserDto;
import com.ssafy.cartel.repository.ClientRepository;
import com.ssafy.cartel.repository.CounselRepository;
import com.ssafy.cartel.repository.CounselorRepository;
import com.ssafy.cartel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
//@Transactional(readOnly = true)
public class ClientService {

    private final ClientRepository clientRepository;
    private final CounselRepository counselRepository;
    private final UserRepository userRepository;

//    @Transactional
//    public Client save(ClientDto clientDto){
//        return clientRepository.save(clientDto.toEntity());
//    }

    public Client save(PaymentDto paymentDto){
        Counsel counsel = counselRepository.findById(paymentDto.getCounselId())
                .orElseThrow(()-> new IllegalArgumentException("not found: id" ));
        User user = userRepository.findById(paymentDto.getUserId())
                .orElseThrow(()-> new IllegalArgumentException("not found: id" ));
        return clientRepository.save(Client.builder()
                .counselId(counsel)
                .userId(user)
                .attendance(0)
                .state(0)
                .build());

    }













    public List<Client> findAll(){
        return clientRepository.findAll();
    }

    public Optional<Client> findById(Integer id){
        return Optional.ofNullable(clientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found:" + id)));
    }

    @Transactional
    public void delete(Integer id){
        clientRepository.deleteById(id);
    }

    @Transactional
    public Client update(Integer id, ClientDto clientDto){
        Client client = clientRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("not found:" + id));

        client.update(clientDto.getAttendance(), clientDto.getState());

        return client;
    }


}
