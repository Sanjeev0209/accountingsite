
        // Interactive Testimonials Switcher (Hover left text to change quote in right side)
        const testimonialTabs = document.querySelectorAll('.testimonial-tab');
        const quoteEl = document.getElementById('testimonial-quote');
        const authorNameEl = document.getElementById('testimonial-author-name');
        const authorSubtextEl = document.getElementById('testimonial-author-subtext');
        const avatarEl = document.querySelector('.client-avatar');

        function activateTestimonial(tab) {
            if (tab.classList.contains('active')) return;
            testimonialTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (quoteEl) {
                quoteEl.style.opacity = '0';
                quoteEl.style.transform = 'translateY(6px)';
                if (avatarEl) avatarEl.style.opacity = '0';

                setTimeout(() => {
                    quoteEl.textContent = tab.getAttribute('data-quote');
                    if (authorNameEl) authorNameEl.textContent = tab.getAttribute('data-author');
                    if (authorSubtextEl) authorSubtextEl.textContent = tab.getAttribute('data-subtext');
                    if (avatarEl && tab.getAttribute('data-avatar')) {
                        avatarEl.src = tab.getAttribute('data-avatar');
                    }
                    quoteEl.style.opacity = '1';
                    quoteEl.style.transform = 'translateY(0)';
                    if (avatarEl) avatarEl.style.opacity = '1';
                }, 150);
            }
        }

        testimonialTabs.forEach(tab => {
            // Hover event: hover the left text to change the quote in the right side
            tab.addEventListener('mouseenter', () => activateTestimonial(tab));
            // Click event: also updates on click / touch screens
            tab.addEventListener('click', () => activateTestimonial(tab));
        });


        // // Enable progressive scroll animations
        document.documentElement.classList.add('js-reveal');
        
        const revealElements = document.querySelectorAll('.reveal');

        // Ensure above-the-fold elements are activated immediately on load
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });

        // Intersection Observer for Smooth Scroll Reveal Animations
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        obs.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.08,
                rootMargin: '0px 0px -20px 0px'
            });

            revealElements.forEach(el => {
                if (!el.classList.contains('active')) {
                    observer.observe(el);
                }
            });
        } else {
            // Fallback for older browsers
            revealElements.forEach(el => el.classList.add('active'));
        }


        //========================================================
        // Book appoinment alert open

         function showAlert() {
            document.getElementById("customAlert").style.display = "block";
        }

        // Function to hide the div
        function closeAlert() {
            document.getElementById("customAlert").style.display = "none";
        }
  
// ==========================================
// DOCTOR DATA
// ONE DOCTOR → 2 OR 3 DEPARTMENTS
const doctors = [
            {
                id: 1,
                name: "Dr. Naveen",
                spl: [
                    "Cardiology",
                    "General Medicine",
                    "Internal Medicine",
                    "Neurosurgery"
                ]
            },
            {
                id: 2,
                name: "Dr. Priya",
                spl: [
                    "Dermatology",
                    "Cosmetology",
                    "Skin Care"
                ]
            },
            {
                id: 3,
                name: "Dr. Hari",
                spl: [
                    "Neurology",
                    "Neurosurgery",
                    "Stroke Medicine"
                ]
            },
            {
                id: 4,
                name: "Dr. Divya",
                spl: [
                    "Pediatrics",
                    "Child Medicine"
                ]
            },
            {
                id: 5,
                name: "Dr. Sanjeev",
                spl: [
                    "Orthopedics",
                    "Sports Medicine"
                ]
            }
        ];
// ==========================================
// VARIABLES
// ==========================================
let selectedDoctor = null;
let selectedSpl = null;
let selectedDate = null;
let selectedTime = null;
// CURRENT DATE
const today = new Date();
let currentMonth =
    today.getMonth();
let currentYear =
    today.getFullYear();
// ==========================================
// TIME SLOTS
// EVERY SLOT = 1 HOUR
// ==========================================
const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM"
];
// ==========================================
// DISPLAY DOCTORS
// ==========================================
function displayDoctors() {
    const select =
        document.getElementById(
            "doctorSelect"
        );
    doctors.forEach(function(doctor) {
        select.innerHTML += `
            <option value="${doctor.id}">
                ${doctor.name}
            </option>
        `;
    });
}
// ==========================================
// SELECT DOCTOR
// ==========================================
function selectDoctor() {
    const select =
        document.getElementById(
            "doctorSelect"
        );
    const id =
        Number(select.value);
    selectedDoctor =
        doctors.find(function(doctor) {
            return doctor.id === id;
        });
    selectedSpl = null;
    if (!selectedDoctor) {
        document.getElementById(
            "specializationList"
        ).innerHTML = `
            <span class="no-spl">
                Select doctor
            </span>
        `;
        updateSelectedDetails();
        return;
    }
    // SHOW DEPARTMENTS
    const splList =
        document.getElementById(
            "specializationList"
        );
    splList.innerHTML = "";
    selectedDoctor.spl.forEach(
        function(spl, index) {
            splList.innerHTML += `
                <button
                    class="spl-btn"
                    onclick="selectSpecialization(${index}, this)"
                >
                    ${spl}
                </button>
            `;
        }
    );
    updateSelectedDetails();
}
// ==========================================
// SELECT DEPARTMENT
// ==========================================
function selectSpecialization(
    index,
    button
) {
    selectedSpl =
        selectedDoctor.spl[index];
    document
        .querySelectorAll(".spl-btn")
        .forEach(function(item) {
            item.classList.remove(
                "active"
            );
        });
    button.classList.add("active");
    updateSelectedDetails();
}
// ==========================================
// SHOW SELECTED DETAILS
// ==========================================
function updateSelectedDetails() {
    const box =
        document.getElementById(
            "selectedDetails"
        );
    const doctorName =
        selectedDoctor
            ? selectedDoctor.name
            : "Not Selected";
    const spl =
        selectedSpl
            ? selectedSpl
            : "Not Selected";
    box.innerHTML = `
        Doctor:
        <strong>
            ${doctorName}
        </strong>
        <br><br>
        Department:
        <strong>
            ${spl}
        </strong>
    `;
}
// ==========================================
// CALENDAR
// ==========================================
function renderCalendar() {
    const calendarDays =
        document.getElementById(
            "calendarDays"
        );
    const monthYear =
        document.getElementById(
            "monthYear"
        );
    calendarDays.innerHTML = "";
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    monthYear.innerText =
        monthNames[currentMonth] +
        " " +
        currentYear;
    const firstDay =
        new Date(
            currentYear,
            currentMonth,
            1
        ).getDay();
    const daysInMonth =
        new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();
    // EMPTY DAYS
    for (
        let i = 0;
        i < firstDay;
        i++
    ) {
        calendarDays.innerHTML += `
            <span></span>
        `;
    }
    // DAYS
    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {
        const date =
            new Date(
                currentYear,
                currentMonth,
                day
            );
        const todayDate =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            );
        const isPast =
            date <= todayDate;
        const isToday =
            date.getTime() ===
            todayDate.getTime();
        const dateString =
            formatDate(date);
        const isSelected =
            selectedDate === dateString;
        calendarDays.innerHTML += `
            <button
                class="
                    day
                    ${isToday ? "today" : ""}
                    ${isSelected ? "selected" : ""}
                "
                ${isPast ? "disabled" : ""}
                onclick="
                    selectDate('${dateString}')
                "
            >
                ${day}

            </button>
        `;
    }
    // PREVIOUS MONTH DISABLED
    const prev =
        document.getElementById(
            "prevMonth"
        );
    if (
        currentYear ===
        today.getFullYear()
        &&
        currentMonth ===
        today.getMonth()
    ) {
        prev.disabled = true;
    } else {
        prev.disabled = false;
    }
}
// ==========================================
// FORMAT DATE
// ==========================================
function formatDate(date) {
    const year =
        date.getFullYear();
    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");
    const day =
        String(
            date.getDate()
        ).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
// ==========================================
// SELECT DATE
// ==========================================
function selectDate(date) {
    selectedDate = date;
    selectedTime = null;
    document.getElementById(
        "timeSelect"
    ).value = "";
    renderCalendar();
}
// =========================================
// DISPLAY TIME DROPDOWN
// ==========================================
function displayTimeSlots() {
    const select =
        document.getElementById(
            "timeSelect"
        );
    timeSlots.forEach(function(time) {
        select.innerHTML += `
            <option value="${time}">
                ${time}
            </option>
        `;
    });
}
// ==========================================
// SELECT TIME
// ==========================================
function selectTime() {
    const select =
        document.getElementById(
            "timeSelect"
        );
    selectedTime = select.value;
}
// ==========================================
// PREVIOUS MONTH
// ==========================================
function previousMonth() {
    if (
        currentYear ===
        today.getFullYear()
        &&
        currentMonth ===
        today.getMonth()
    ) {
        return;
    }
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}
// ==========================================
// NEXT MONTH
// ==========================================
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}
// ==========================================
// BOOK APPOINTMENT
// ==========================================
function bookAppointment() {
    if (!selectedDoctor) {
        alert("Please select doctor.");
        return;
    }
    if (!selectedSpl) {
        alert("Please select department.");
        return;
    }
    if (!selectedDate) {
        alert("Please select date.");
        return;
    }
    if (!selectedTime) {
        alert("Please select time.");
        return;
    }
    const appointment = {
        doctorId:
            selectedDoctor.id,
        doctorName:
            selectedDoctor.name,
        specialization:
            selectedSpl,
        date:
            selectedDate,
        time:
            selectedTime
    };
    console.log(appointment);
    alert(
        "Appointment Booked!\n\n" +
        "Doctor: " +
        appointment.doctorName +
        "\nDepartment: " +
        appointment.specialization +
        "\nDate: " +
        appointment.date +
        "\nTime: " +
        appointment.time
    );
}      
// ==========================================
// START
// ==========================================
displayDoctors();
renderCalendar();
displayTimeSlots();



function closeAlert() {
    // 1000 milliseconds = 1 second
    setTimeout(function() {
        window.location.reload();
    }, 100);
}