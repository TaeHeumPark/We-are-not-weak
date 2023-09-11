package com.ssafy.cartel.repository;

import com.ssafy.cartel.domain.Article;
import com.ssafy.cartel.domain.Career;
import com.ssafy.cartel.domain.Counselor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CareerRepository extends JpaRepository<Career, Integer> {

    List<Career> findAllByCounselor(Counselor counselor);
}
