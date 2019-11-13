package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Ingresso;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Ingresso entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IngressoRepository extends JpaRepository<Ingresso, Long> {

}
