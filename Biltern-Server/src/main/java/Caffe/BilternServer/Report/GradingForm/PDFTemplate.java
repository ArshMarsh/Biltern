package Caffe.BilternServer.Report.GradingForm;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.*;

@Entity(name = "PDFTemplate")
@Table(name = "PDFTemplate")
public class PDFTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "id",
            nullable = false,
            updatable = false
    )
    private Long id;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] template;

    public Long getId() {
        return id;
    }

    public byte[] getTemplate() {
        return template;
    }

    public void setTemplate(byte[] template) {
        this.template = template;
    }
}

