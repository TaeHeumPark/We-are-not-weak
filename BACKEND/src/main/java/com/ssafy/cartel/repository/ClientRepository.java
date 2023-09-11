package com.ssafy.cartel.repository;


import com.ssafy.cartel.domain.Client;
import com.ssafy.cartel.domain.Counsel;
import com.ssafy.cartel.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Integer> {
    Optional<Client> findByUserId(User userId);

    List<Client> findAllByCounselId(Counsel counselId);


}
