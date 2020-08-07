package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Notice;
import com.mycompany.myapp.repository.NoticeRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Notice}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NoticeResource {

    private final Logger log = LoggerFactory.getLogger(NoticeResource.class);

    private static final String ENTITY_NAME = "notice";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NoticeRepository noticeRepository;

    public NoticeResource(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    /**
     * {@code POST  /notices} : Create a new notice.
     *
     * @param notice the notice to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new notice, or with status {@code 400 (Bad Request)} if the notice has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/notices")
    public ResponseEntity<Notice> createNotice(@RequestBody Notice notice) throws URISyntaxException {
        log.debug("REST request to save Notice : {}", notice);
        if (notice.getId() != null) {
            throw new BadRequestAlertException("A new notice cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Notice result = noticeRepository.save(notice);
        return ResponseEntity.created(new URI("/api/notices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /notices} : Updates an existing notice.
     *
     * @param notice the notice to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated notice,
     * or with status {@code 400 (Bad Request)} if the notice is not valid,
     * or with status {@code 500 (Internal Server Error)} if the notice couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/notices")
    public ResponseEntity<Notice> updateNotice(@RequestBody Notice notice) throws URISyntaxException {
        log.debug("REST request to update Notice : {}", notice);
        if (notice.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Notice result = noticeRepository.save(notice);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, notice.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /notices} : get all the notices.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of notices in body.
     */
    @GetMapping("/notices")
    public List<Notice> getAllNotices() {
        log.debug("REST request to get all Notices");
        return noticeRepository.findAll();
    }

    /**
     * {@code GET  /notices/:id} : get the "id" notice.
     *
     * @param id the id of the notice to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the notice, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/notices/{id}")
    public ResponseEntity<Notice> getNotice(@PathVariable Long id) {
        log.debug("REST request to get Notice : {}", id);
        Optional<Notice> notice = noticeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(notice);
    }

    /**
     * {@code DELETE  /notices/:id} : delete the "id" notice.
     *
     * @param id the id of the notice to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/notices/{id}")
    public ResponseEntity<Void> deleteNotice(@PathVariable Long id) {
        log.debug("REST request to delete Notice : {}", id);
        noticeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
