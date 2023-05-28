package Caffe.BilternServer.users;

import Caffe.BilternServer.auth.BilternUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@CrossOrigin("${client.domain}")
@RestController
@RequestMapping("grader")
public class GraderController {

    private final GraderService graderService;

    @Autowired
    public GraderController(GraderService graderService) {
        this.graderService = graderService;
    }

    @GetMapping(path = "/details/what")
    public List<Grader> getGraders() { return graderService.getGraders(); }

    @PostMapping
    public void addGrader(@RequestBody Grader grader) { graderService.addGrader(grader); }

    @DeleteMapping(path = "{id}")
    public void deleteGrader(@PathVariable("id") Long id) { graderService.deleteGrader(id); }

    @GetMapping("details")
    public ResponseEntity<GraderDTO> getGraderDetails() {
        BilternUser grader = (BilternUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(graderService.getGraderDetails(grader.getBilkentId()));
    }

    @Transactional
    @PutMapping(path = "/signature/{graderId}")
    public void uploadSignature(@PathVariable Long graderId, @RequestBody MultipartFile signature) {
        if (!signature.isEmpty()) {
            try {
                byte[] signatureFile = signature.getBytes();
                graderService.uploadSignature(graderId, signatureFile);
            }
            catch (IOException e){
                e.printStackTrace();
            }
        }
    }

    @GetMapping(path = "/signature/{graderId}")
    public ResponseEntity<ByteArrayResource> displaySignature(@PathVariable Long graderId) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.IMAGE_PNG);

        return ResponseEntity.ok().headers(httpHeaders).body(graderService.downloadSignature(graderId));
    }
}
