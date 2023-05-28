package Caffe.BilternServer.report;

import Caffe.BilternServer.course.Course;
import Caffe.BilternServer.users.Grader;
import Caffe.BilternServer.users.TeachingAssistant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    Report findReportById(Long reportId);
    List<Report> findAll();

    Optional<Report> findReportByStudentBilkentIdAndCourseCourseCode(Long bilkentId, String courseCode);
    Integer countAllByTAAndReportStatsAndIsIteration(TeachingAssistant teachingAssistant, ReportStats reportStats, boolean isIteration);

    Integer countAllByGraderAndReportStatsAndIsIteration(Grader grader, ReportStats reportStats, boolean isIteration);
    Integer countAllByCourseAndReportStatsAndIsIteration(Course course, ReportStats reportStats, boolean isIteration);
}
