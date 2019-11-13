package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Ingresso;
import com.mycompany.myapp.repository.IngressoRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Ingresso}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class IngressoResource {

    private final Logger log = LoggerFactory.getLogger(IngressoResource.class);

    private static final String ENTITY_NAME = "ingresso";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IngressoRepository ingressoRepository;

    public IngressoResource(IngressoRepository ingressoRepository) {
        this.ingressoRepository = ingressoRepository;
    }

    /**
     * {@code POST  /ingressos} : Create a new ingresso.
     *
     * @param ingresso the ingresso to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ingresso, or with status {@code 400 (Bad Request)} if the ingresso has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ingressos")
    public ResponseEntity<Ingresso> createIngresso(@RequestBody Ingresso ingresso) throws URISyntaxException {
        log.debug("REST request to save Ingresso : {}", ingresso);
        if (ingresso.getId() != null) {
            throw new BadRequestAlertException("A new ingresso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ingresso result = ingressoRepository.save(ingresso);
        return ResponseEntity.created(new URI("/api/ingressos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ingressos} : Updates an existing ingresso.
     *
     * @param ingresso the ingresso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ingresso,
     * or with status {@code 400 (Bad Request)} if the ingresso is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ingresso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ingressos")
    public ResponseEntity<Ingresso> updateIngresso(@RequestBody Ingresso ingresso) throws URISyntaxException {
        log.debug("REST request to update Ingresso : {}", ingresso);
        if (ingresso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ingresso result = ingressoRepository.save(ingresso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ingresso.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ingressos} : get all the ingressos.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ingressos in body.
     */
    @GetMapping("/ingressos")
    public ResponseEntity<List<Ingresso>> getAllIngressos(Pageable pageable) {
        log.debug("REST request to get a page of Ingressos");
        Page<Ingresso> page = ingressoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ingressos/:id} : get the "id" ingresso.
     *
     * @param id the id of the ingresso to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ingresso, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ingressos/{id}")
    public ResponseEntity<Ingresso> getIngresso(@PathVariable Long id) {
        log.debug("REST request to get Ingresso : {}", id);
        Optional<Ingresso> ingresso = ingressoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ingresso);
    }

    /**
     * {@code DELETE  /ingressos/:id} : delete the "id" ingresso.
     *
     * @param id the id of the ingresso to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ingressos/{id}")
    public ResponseEntity<Void> deleteIngresso(@PathVariable Long id) {
        log.debug("REST request to delete Ingresso : {}", id);
        ingressoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
