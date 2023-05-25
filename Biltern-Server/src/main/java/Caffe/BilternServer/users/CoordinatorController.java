package Caffe.BilternServer.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("coordinator")
public class CoordinatorController {

    private final CoordinatorService coordinatorService;

    @Autowired
    public CoordinatorController(CoordinatorService coordinatorService) {
        this.coordinatorService = coordinatorService;
    }

    @GetMapping
    public List<Coordinator> getCoordinators() { return coordinatorService.getCoordinators(); }

    @PostMapping
    public void addCoordinator(@RequestBody Coordinator coordinator) { coordinatorService.addCoordinator(coordinator); }

    @DeleteMapping(path = "{id}")
    public void deleteCoordinator(@PathVariable("id") Long id) { coordinatorService.deleteCoordinator(id); }
}
