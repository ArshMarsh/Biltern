package Caffe.BilternServer.assignmentmanager;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.management.InstanceAlreadyExistsException;
import java.io.IOException;
@CrossOrigin(origins = "${client.domain}")
@RestController
@RequestMapping("/init")
public class AssignmentController {

    private AssignmentService assignmentService;
    @Autowired
    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

   @PostMapping
    public void init(@RequestBody MultipartFile file) throws InstanceAlreadyExistsException, IOException {
        assignmentService.parseExcelSheet(file);
   }
}
