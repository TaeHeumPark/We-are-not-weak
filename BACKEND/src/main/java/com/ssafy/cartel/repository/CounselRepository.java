
package com.ssafy.cartel.repository;


import com.ssafy.cartel.domain.Counsel;
import com.ssafy.cartel.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CounselRepository extends JpaRepository<Counsel, Integer> {
}
