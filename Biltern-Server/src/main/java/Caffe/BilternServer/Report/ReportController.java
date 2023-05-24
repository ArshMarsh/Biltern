package Caffe.BilternServer.Report;

import Caffe.BilternServer.Report.Feedback.FeedbackService;
import Caffe.BilternServer.Report.GradingForm.GradingFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("report")
public class ReportController {
    private final ReportService reportService;
    private final FeedbackService feedbackService;
    private final GradingFormService gradingFormService;
    @Autowired
    public ReportController(ReportService reportService, FeedbackService feedbackService, GradingFormService gradingFormService) {
        this.reportService = reportService;
        this.feedbackService = feedbackService;
        this.gradingFormService = gradingFormService;
    }


    @GetMapping
    public ResponseEntity<String> dosth(){
        return ResponseEntity.ok("fuck you");
    }

    @PostMapping
    public ResponseEntity<String> dosth2(){
        return ResponseEntity.ok("fuck you");
    }
    @PutMapping("/dueDate")
    public void changeReportDueDate(@RequestBody Map<String, Object> requestBody){
        LocalDate dueDate = LocalDate.parse((String) requestBody.get("dueDate"), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    @PutMapping("/approvalDueDate")
    public void changeReportApprovalDueDate(@RequestBody Map<String, Object> requestBody){
        LocalDate approvalDueDate = LocalDate.parse((String) requestBody.get("approvalDueDate"), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    @PutMapping("/reportContent")
    public void uploadReport(@RequestBody MultipartFile file){
        System.out.println("what the fuck");
        if (!file.isEmpty()) {
            try {
                byte[] reportContent = file.getBytes();

                reportService.uploadReportPDF(reportContent);

            } catch (IOException e) {
                e.printStackTrace();
                // Handle the exception
            }
        }
    }
    @GetMapping("/reportContent")
    public ResponseEntity<ByteArrayResource> downloadReport() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "pdf_file.pdf");

        Long id = Long.valueOf(1);
        return ResponseEntity.ok()
                .headers(headers)
                .body(reportService.downloadReport(id));
    }

    @DeleteMapping("/reportContent")
    public void deleteReportPDF(){
        reportService.deleteReportPDF();
    }


    @PutMapping("/feedback")
    public void saveReportFeedback(@RequestBody MultipartFile file) {
        try {
            feedbackService.saveReportFeedback(Long.valueOf(1),file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/feedback")
    public ResponseEntity<ByteArrayResource> downloadReportFeedback() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "pdf_file.pdf");

        Long id = Long.valueOf(1);
        return ResponseEntity.ok()
                .headers(headers)
                .body(feedbackService.downloadReportFeedback(id));
    }
    @PutMapping("/previewFeedback")
    public void savePreviewReportFeedback(@RequestBody MultipartFile file) {
        try {
            feedbackService.saveReportPreviewFeedback(Long.valueOf(1),file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/previewFeedback")
    public ResponseEntity<ByteArrayResource> downloadReportPreviewFeedback() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "pdf_file.pdf");

        Long id = Long.valueOf(1);
        return ResponseEntity.ok()
                .headers(headers)
                .body(feedbackService.downloadReportFeedback(id));
    }

    @GetMapping("/downloadGradingForm")
    public ResponseEntity<ByteArrayResource> downloadGradingForm(){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "pdf_file.pdf");

        Long id = Long.valueOf(1);
        return ResponseEntity.ok()
                .headers(headers)
                .body(gradingFormService.downloadGradingForm(id));
    }

}

