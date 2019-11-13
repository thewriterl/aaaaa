package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class IngressoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ingresso.class);
        Ingresso ingresso1 = new Ingresso();
        ingresso1.setId(1L);
        Ingresso ingresso2 = new Ingresso();
        ingresso2.setId(ingresso1.getId());
        assertThat(ingresso1).isEqualTo(ingresso2);
        ingresso2.setId(2L);
        assertThat(ingresso1).isNotEqualTo(ingresso2);
        ingresso1.setId(null);
        assertThat(ingresso1).isNotEqualTo(ingresso2);
    }
}
