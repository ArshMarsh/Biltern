package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import Caffe.BilternServer.auth.BilternUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
public class Grader extends BilternUser {

    @Column
    private Long reportCount;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    @Basic(fetch = FetchType.LAZY)
    private byte[] signature;

    @OneToMany(mappedBy = "grader", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Report> reports;
    private Department department;
}
