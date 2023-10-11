# US 210

## Domain Model Documentation

>## By client specifications:

---
>**QUESTION:** As it is said in the project description, "Courses may have a minimum and a maximum number of enrolled students. This may limit the possibility of opening (i.e. starting) courses that do not satisfy the limits.", that being showed we want to know if it is optional to have limits on the course?
If its mandatory to have the limits, who can establish limits of students  to the course?, what are the acceptable limits of students in a course? And what are the conditions for a course to have limits?

> **CLIENT'S ANSWER:** Managers should be able to specify the limits. In my opinion the system should notify the manager if a course is out of the enrollment limits (before this course is changed to "in progress"). But, in the end, it is up to the manager to follow/enforce or not, the limits.

---

>**QUESTION:** Can one student be enrolled in different courses?

>**CLIENT'S ANSWER:** Yes!

---

>**QUESTION:** when a user shares a board with multiples users are the permissions (read or write) defined per user ?
Or are they the same for every user it is shared with ?

>**CLIENT'S ANSWER:** The owner of the board should be able to specify the access that each user has to the board (read or write).

---


>**QUESTION:** Can the same question be used in different exams? Or are the questions made for a specific exam?


>**CLIENT'S ANSWER:** At the present moment, when designing the exam, the user specifies all its structure (including the questions, as described in section 5.2.4). There is no "database" of questions.

Note: However, it is possible that new user stories regarding exams will be added (in sprint B and C) for teams/groups with an extended number of students enrolled in LPROG

---


>**QUESTION:** Can a meeting and class overlap? If so, should the system notify that there is an overlap and for which user(s)?

>**CLIENT'S ANSWER:** FRC09 - Schedule of Class A teacher schedule a class (always a recurring class, happens every week). System must check if the Teacher is available for the class period
Regarding Meetings: FRM01 - Schedule a Meeting A user schedules a meeting. The system must check if all participants are available and send invitations to participants.
In the case of Meetings they should not be created if the participants are not available (i.e., they may have classes or other meetings at the same time).

---


>**QUESTION:** Is an exam available for all students of a certain course, or do the students of the course need to sign up to take an exam previously

>**CLIENT'S ANSWER:** I think there is no "sign up" for exams. After the exam is created it should be available to all the students of that course, and all the students can/should take that exam.

---

>**QUESTION:** In the requirements, it says that the system should maintain the history/log of all the updates on the board. There's someone specific that will be able to see those logs, or is it just something everyone that has access to the board can see?

>**CLIENT'S ANSWER:** The history in the boards is important for the following functional requirements:<br/>
FRB06 - Undo Post-it Change A user undo the last change in a post-it<br/>
FRB07 - View Board History A user views a history of updates in a board<br/>
If a user as read access to the board he/she can view the history.

---


>**QUESTION:** After the exam being created, the teacher can still change it? If yes, can two (or more) teachers edit the same exam?

>**CLIENT'S ANSWER:** There is no explicit statement regarding editing an exam. However, there are several data to be specified for an exam and its specification can be complex. Therefore, as a Client of the system, I think that FRE01, in the perspective of a use case, can be a very long use case, including several steps, with, for instance, a step to validate the exam specification (according to the grammar). All these specifications and steps are prone to user errors. Therefore, maybe you should consider a final "publish" action to mark the end of the creation process or some other alternative solution to support this lengthy process.

---

>**QUESTION:** Can any teacher schedule classes for the courses he/she is in or only the teacher in charge can schedule classes for the course he/she is in charge?
If only the teacher in charge for that course can schedule classes does that also mean that only he/she can schedule extra classes?

>**CLIENT'S ANSWER:** For the requirements of the system you may consider that the roles of teacher and teacher in charge have the same capabilities. The only rule is that each course must have one teacher in charge. So, the system must register the teacher in charge for each course.
The teacher in charge has more responsibilities than a regular teacher but, for the moment, they are outside the system to be developed (for instance, the program and contents of the course are a responsibility of the teacher in charge).

---


| **_Aggregate_** (EN) | **_Decisions_** (EN)                                                                                                                                                                                                                                                                                                                                                               |                                       
|:---------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Managers**         | Managers can open enrollments for courses, changing the status of that course. We decided to not connect managers and courses, because it's irrelevant to know which manager opened which course.                                                                                                                                                                                  |
| **Teachers**         | Teachers can manage many courses, being able to create classes and exams for it. For each course there's also one head teacher assigned, we found it very relevant to know the head teacher of each course.                                                                                                                                                                        |
| **Students**         | Students can be enrolled in many courses and can take the exams and attend the classes of those courses. We decided to separate the tax payer and birth date of students and teachers as they belong to different aggregates.                                                                                                                                                      |
| **Courses**          | Courses are managed by many teacher. They also can have many students, but they will have to enlist themselves to be enrolled in the course. We found it relevant to save the status of their enrollment.                                                                                                                                                                          |
| **Exams**            | Exams can be taken by many students and they're created by one teacher. They're composed of sections, each section composed by questions and questions can be of many types.                                                                                                                                                                                                       |
| **Evaluation**       | We found it relevant to separate Evaluation and Exams in different aggregates, as the event of making and taking an exam is different from the evaluation part, where students will be able to check their grades and get feedback on the exam's questions                                                                                                                         |
| **Classes**          | Teachers can create many classes, even if those classes cannot overlap each other. There's two types of classes. The recurrent class, which happens every week at the same day of the week and at the same time for all the students enlisted in that course and the Unique Class, that is defined for a specific date and the teacher can define which students attend that class |
| **Meetings**         | Any user can create a meeting and be invited into one. They can either accept or reject the invitation.                                                                                                                                                                                                                                                                            |
| **Boards**           | Users can create and participate of boards. Boards are composed of columns and rows. Users with write permissions can put post its on boards. Every post it has its coordinates and versions, making it able to check all the changes made to a post it and even undo those changes and return to older versions of that post it.                                                  |

**Note:** In the domain model there's tags for roots, entities and value objects. 
- The root tag is placed on the main entity that holds reference to the other entities of the same aggregate.
- The entity tag is placed in entities. Entities are representations of an object and defined by their attributes.
- The Value Object tag is placed on certain concepts that we consider relevant to our domain.