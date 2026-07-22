require("dotenv").config();

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const connectDB = require("../config/db");

const User = require("../models/User");
const Content = require("../models/Content");
const ViewerSession = require("../models/ViewerSession");
const Setting = require("../models/Setting");
const EngagementScore = require("../models/EngagementScore");
const RetentionAnalytics = require("../models/RetentionAnalytics");
const Recommendation = require("../models/Recommendation");
const Report = require("../models/Report");

async function seedDatabase() {

    await connectDB();

    console.log("Connected");

    await User.deleteMany({});
    await Content.deleteMany({});

    console.log("Old data removed");

    const users = [];

    for (let i = 1; i <= 100; i++) {

        users.push({

            name: faker.person.fullName(),

            email: faker.internet.email(),

            password: "$2b$10$samplehashedpassword",

            role: i % 10 === 0 ? "Admin" : "Analyst",

            profileImage: faker.image.avatar()

        });

    }

    const insertedUsers = await User.insertMany(users);

    console.log(`${insertedUsers.length} Users Added`);

    const genres = [

        "Action",

        "Comedy",

        "Drama",

        "Sci-Fi",

        "Romance",

        "Thriller",

        "Animation"

    ];

    const languages = [

        "English",

        "Tamil",

        "Hindi",

        "Spanish",

        "French"

    ];

    const contents = [];

    for (let i = 1; i <= 200; i++) {

        contents.push({

            title: faker.book.title(),

            description: faker.lorem.sentences(2),

            genre: genres[Math.floor(Math.random() * genres.length)],

            language: languages[Math.floor(Math.random() * languages.length)],

            contentType: Math.random() > 0.5 ? "Movie" : "Series",

            releaseDate: faker.date.past(),

            durationMin: faker.number.int({

                min: 70,

                max: 180

            }),

            imdbRating: faker.number.float({

                min: 5,

                max: 9.9,

                precision: 0.1

            }),

            thumbnailUrl: faker.image.url(),

            status: "Active"

        });

    }

    const insertedContent = await Content.insertMany(contents);

    console.log(`${insertedContent.length} Content Added`);

// -----------------------------
// Remove Existing Data
// -----------------------------

await ViewerSession.deleteMany({});
await Setting.deleteMany({});

console.log("Old Viewer Sessions Removed");
console.log("Old Settings Removed");

// -----------------------------
// Generate Settings
// -----------------------------

const settings = [];

for (const user of insertedUsers) {

    settings.push({

        user_id: user._id,

        theme: Math.random() > 0.5 ? "Dark" : "Light",

        language: "English",

        notifications_enabled: Math.random() > 0.3,

        timezone: "Asia/Kolkata"

    });

}

await Setting.insertMany(settings);

console.log(`${settings.length} Settings Added`);

// -----------------------------
// Generate Viewer Sessions
// -----------------------------

const devices = [
    "Mobile",
    "Laptop",
    "Smart TV",
    "Tablet"
];

const subscriptions = [
    "Basic",
    "Standard",
    "Premium"
];

const regions = [
    "India",
    "USA",
    "UK",
    "Canada",
    "Australia"
];

const viewerSessions = [];

for (let i = 0; i < 5000; i++) {

    const randomUser =
        insertedUsers[Math.floor(Math.random() * insertedUsers.length)];

    const randomContent =
        insertedContent[Math.floor(Math.random() * insertedContent.length)];

    const duration =
        randomContent.durationMin * 60;

    const watched =
        Math.floor(duration * (Math.random() * 0.6 + 0.4));

    const completion =
        Number(((watched / duration) * 100).toFixed(2));

    viewerSessions.push({

        content_id: randomContent._id,

        viewer_id: randomUser._id,

        watch_date: faker.date.recent({

            days: 180

        }),

        completion_percentage: completion,

        watch_duration_sec: watched,

        pause_count: faker.number.int({

            min: 0,

            max: 10

        }),

        rewind_count: faker.number.int({

            min: 0,

            max: 5

        }),

        fast_forward_count: faker.number.int({

            min: 0,

            max: 5

        }),

        device_type:
            devices[Math.floor(Math.random() * devices.length)],

        subscription_tier:
            subscriptions[Math.floor(Math.random() * subscriptions.length)],

        region:
            regions[Math.floor(Math.random() * regions.length)],

        session_status:
            completion >= 90
                ? "Completed"
                : "Incomplete"

    });

}

await ViewerSession.insertMany(viewerSessions);

console.log(`${viewerSessions.length} Viewer Sessions Added`);

// =====================================================
// PART 3 - ENGAGEMENT SCORES & RETENTION ANALYTICS
// =====================================================

// Remove Old Data

await EngagementScore.deleteMany({});
await RetentionAnalytics.deleteMany({});

console.log("Old Engagement Scores Removed");
console.log("Old Retention Analytics Removed");

// ===============================================
// Generate Engagement Scores
// ===============================================

const engagementData = [];

for (const content of insertedContent) {

    const sessions = viewerSessions.filter(
        session =>
            session.content_id.toString() === content._id.toString()
    );

    if (sessions.length === 0) continue;

    const totalViews = sessions.length;

    const totalCompletedViews =
        sessions.filter(
            s => s.completion_percentage >= 90
        ).length;

    const averageCompletionRate =
        Number(
            (
                sessions.reduce(
                    (sum, s) => sum + s.completion_percentage,
                    0
                ) / totalViews
            ).toFixed(2)
        );

    const averageWatchDuration =
        Number(
            (
                sessions.reduce(
                    (sum, s) => sum + s.watch_duration_sec,
                    0
                ) / totalViews
            ).toFixed(2)
        );

    const averagePauseFrequency =
        Number(
            (
                sessions.reduce(
                    (sum, s) => sum + s.pause_count,
                    0
                ) / totalViews
            ).toFixed(2)
        );

    const engagementScore =
        Number(
            (
                (averageCompletionRate * 0.6) +
                ((100 - averagePauseFrequency) * 0.4)
            ).toFixed(2)
        );

    engagementData.push({

        content_id: content._id,

        average_completion_rate: averageCompletionRate,

        average_watch_duration: averageWatchDuration,

        average_pause_frequency: averagePauseFrequency,

        engagement_score: engagementScore,

        total_views: totalViews,

        total_completed_views: totalCompletedViews,

        calculated_on: new Date()

    });

}

await EngagementScore.insertMany(engagementData);

console.log(`${engagementData.length} Engagement Scores Added`);


// ===============================================
// Generate Retention Analytics
// ===============================================

const retentionData = [];

for (const content of insertedContent) {

    const sessions = viewerSessions.filter(
        session =>
            session.content_id.toString() === content._id.toString()
    );

    if (sessions.length === 0) continue;

    const total = sessions.length;

    const returningViewers =
        Math.floor(total * (0.55 + Math.random() * 0.25));

    const newViewers =
        total - returningViewers;

    const retentionRate =
        Number(
            ((returningViewers / total) * 100).toFixed(2)
        );

    const churnRate =
        Number((100 - retentionRate).toFixed(2));

    const renewedViewers =
        Math.floor(returningViewers * 0.70);

    const renewedSubscribers =
        Math.floor(returningViewers * 0.55);

    const churnedSubscribers =
        Math.floor(newViewers * 0.30);

    retentionData.push({

        content_id: content._id,

        analysis_period: "Monthly",

        retention_rate: retentionRate,

        churn_rate: churnRate,

        returning_viewers: returningViewers,

        new_viewers: newViewers,

        renewed_viewers: renewedViewers,

        renewed_subscribers: renewedSubscribers,

        churned_subscribers: churnedSubscribers,

        calculated_on: new Date()

    });

}

await RetentionAnalytics.insertMany(retentionData);

console.log(`${retentionData.length} Retention Analytics Added`);

await Recommendation.deleteMany({});
await Report.deleteMany({});

console.log("Old Recommendations Removed");
console.log("Old Reports Removed");
// ============================================
// RECOMMENDATIONS
// ============================================

const recommendationTypes = [
    "Renew Content",
    "Promote Content",
    "Feature on Home",
    "Improve Metadata",
    "Target New Audience"
];

const priorities = [
    "High",
    "Medium",
    "Low"
];

const reasons = [
    "Excellent Engagement",
    "High Viewer Retention",
    "Growing Popularity",
    "Low Churn Rate",
    "Trending in Multiple Regions"
];

const recommendations = [];

for (const content of insertedContent) {

    recommendations.push({

        content_id: content._id,

        recommendation_type:
            recommendationTypes[
                Math.floor(Math.random() * recommendationTypes.length)
            ],

        confidence_score:
            Number((80 + Math.random() * 20).toFixed(2)),

        priority:
            priorities[
                Math.floor(Math.random() * priorities.length)
            ],

        reason:
            reasons[
                Math.floor(Math.random() * reasons.length)
            ],

        generated_on: new Date()

    });

}

await Recommendation.insertMany(recommendations);

console.log(`${recommendations.length} Recommendations Added`);

// ============================================
// REPORTS
// ============================================

const reportTypes = [
    "Engagement",
    "Retention",
    "Content",
    "Recommendation",
    "Dashboard"
];

const formats = [
    "PDF",
    "CSV"
];

const reports = [];

for (let i = 1; i <= 100; i++) {

    const randomUser =
        insertedUsers[
            Math.floor(Math.random() * insertedUsers.length)
        ];

    reports.push({

        report_name: `Analytics Report ${i}`,

        report_type:
            reportTypes[
                Math.floor(Math.random() * reportTypes.length)
            ],

        generated_by: randomUser._id,

        start_date:
            faker.date.past(),

        end_date:
            faker.date.recent(),

        export_format:
            formats[
                Math.floor(Math.random() * formats.length)
            ],

        file_path:
            `/reports/report_${i}.pdf`,

        generated_on:
            new Date()

    });

}

await Report.insertMany(reports);

console.log(`${reports.length} Reports Added`);


    console.log("Database Seeded Successfully");

    process.exit();

}

seedDatabase();