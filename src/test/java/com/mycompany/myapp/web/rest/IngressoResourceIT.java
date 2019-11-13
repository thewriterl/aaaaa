package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.AaaaApp;
import com.mycompany.myapp.domain.Ingresso;
import com.mycompany.myapp.repository.IngressoRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link IngressoResource} REST controller.
 */
@SpringBootTest(classes = AaaaApp.class)
public class IngressoResourceIT {

    private static final String DEFAULT_CODIGO_REFERENCIA = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_REFERENCIA = "BBBBBBBBBB";

    @Autowired
    private IngressoRepository ingressoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restIngressoMockMvc;

    private Ingresso ingresso;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IngressoResource ingressoResource = new IngressoResource(ingressoRepository);
        this.restIngressoMockMvc = MockMvcBuilders.standaloneSetup(ingressoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ingresso createEntity(EntityManager em) {
        Ingresso ingresso = new Ingresso()
            .codigoReferencia(DEFAULT_CODIGO_REFERENCIA);
        return ingresso;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ingresso createUpdatedEntity(EntityManager em) {
        Ingresso ingresso = new Ingresso()
            .codigoReferencia(UPDATED_CODIGO_REFERENCIA);
        return ingresso;
    }

    @BeforeEach
    public void initTest() {
        ingresso = createEntity(em);
    }

    @Test
    @Transactional
    public void createIngresso() throws Exception {
        int databaseSizeBeforeCreate = ingressoRepository.findAll().size();

        // Create the Ingresso
        restIngressoMockMvc.perform(post("/api/ingressos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingresso)))
            .andExpect(status().isCreated());

        // Validate the Ingresso in the database
        List<Ingresso> ingressoList = ingressoRepository.findAll();
        assertThat(ingressoList).hasSize(databaseSizeBeforeCreate + 1);
        Ingresso testIngresso = ingressoList.get(ingressoList.size() - 1);
        assertThat(testIngresso.getCodigoReferencia()).isEqualTo(DEFAULT_CODIGO_REFERENCIA);
    }

    @Test
    @Transactional
    public void createIngressoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ingressoRepository.findAll().size();

        // Create the Ingresso with an existing ID
        ingresso.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIngressoMockMvc.perform(post("/api/ingressos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingresso)))
            .andExpect(status().isBadRequest());

        // Validate the Ingresso in the database
        List<Ingresso> ingressoList = ingressoRepository.findAll();
        assertThat(ingressoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllIngressos() throws Exception {
        // Initialize the database
        ingressoRepository.saveAndFlush(ingresso);

        // Get all the ingressoList
        restIngressoMockMvc.perform(get("/api/ingressos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ingresso.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigoReferencia").value(hasItem(DEFAULT_CODIGO_REFERENCIA)));
    }
    
    @Test
    @Transactional
    public void getIngresso() throws Exception {
        // Initialize the database
        ingressoRepository.saveAndFlush(ingresso);

        // Get the ingresso
        restIngressoMockMvc.perform(get("/api/ingressos/{id}", ingresso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ingresso.getId().intValue()))
            .andExpect(jsonPath("$.codigoReferencia").value(DEFAULT_CODIGO_REFERENCIA));
    }

    @Test
    @Transactional
    public void getNonExistingIngresso() throws Exception {
        // Get the ingresso
        restIngressoMockMvc.perform(get("/api/ingressos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIngresso() throws Exception {
        // Initialize the database
        ingressoRepository.saveAndFlush(ingresso);

        int databaseSizeBeforeUpdate = ingressoRepository.findAll().size();

        // Update the ingresso
        Ingresso updatedIngresso = ingressoRepository.findById(ingresso.getId()).get();
        // Disconnect from session so that the updates on updatedIngresso are not directly saved in db
        em.detach(updatedIngresso);
        updatedIngresso
            .codigoReferencia(UPDATED_CODIGO_REFERENCIA);

        restIngressoMockMvc.perform(put("/api/ingressos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIngresso)))
            .andExpect(status().isOk());

        // Validate the Ingresso in the database
        List<Ingresso> ingressoList = ingressoRepository.findAll();
        assertThat(ingressoList).hasSize(databaseSizeBeforeUpdate);
        Ingresso testIngresso = ingressoList.get(ingressoList.size() - 1);
        assertThat(testIngresso.getCodigoReferencia()).isEqualTo(UPDATED_CODIGO_REFERENCIA);
    }

    @Test
    @Transactional
    public void updateNonExistingIngresso() throws Exception {
        int databaseSizeBeforeUpdate = ingressoRepository.findAll().size();

        // Create the Ingresso

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIngressoMockMvc.perform(put("/api/ingressos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingresso)))
            .andExpect(status().isBadRequest());

        // Validate the Ingresso in the database
        List<Ingresso> ingressoList = ingressoRepository.findAll();
        assertThat(ingressoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIngresso() throws Exception {
        // Initialize the database
        ingressoRepository.saveAndFlush(ingresso);

        int databaseSizeBeforeDelete = ingressoRepository.findAll().size();

        // Delete the ingresso
        restIngressoMockMvc.perform(delete("/api/ingressos/{id}", ingresso.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ingresso> ingressoList = ingressoRepository.findAll();
        assertThat(ingressoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
