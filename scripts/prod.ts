import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data (in sequence to avoid deadlocks)
    console.log("Deleting existing data...");
    await db.delete(schema.userProgress);
    console.log("✓ Deleted user progress");
    await db.delete(schema.challengeOptions);
    console.log("✓ Deleted challenge options");
    await db.delete(schema.challenges);
    console.log("✓ Deleted challenges");
    await db.delete(schema.lessons);
    console.log("✓ Deleted lessons");
    await db.delete(schema.units);
    console.log("✓ Deleted units");
    await db.delete(schema.courses);
    console.log("✓ Deleted courses");
    await db.delete(schema.userSubscription);
    console.log("✓ Deleted user subscriptions");
    console.log("Database cleared successfully!");

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([{ title: "Vietnamese Sign Language", imageSrc: "/vnflg.svg" }])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `The basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "VIDEO",
                question: 'Xin chào',
                videoSrc: "xinchao.mp4",
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "VIDEO",
                question: 'Gia đình',
                videoSrc: "fam.mp4",
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: 'What is this sign mean?',
                videoSrc:"xinchao.mp4",
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "VIDEO",
                question: 'Sinh nhật',
                videoSrc: "sn.mp4",
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "VIDEO",
                question: 'Khoẻ',
                videoSrc: "khoe.mp4",
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: 'What is this sign mean?',
                videoSrc: "sn.mp4",
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: 'What sign is this?',
                videoSrc: "khoe.mp4",
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: 'What sign is this?',
                videoSrc: "fam.mp4",
                order: 8,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            // Challenge 1: Xin chào (Hello)
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Hello",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Goodbye",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Thank you",
                  imageSrc: null,
                  audioSrc: null,
                },
              ]);
            }

            // Challenge 2: Gia đình (Family)
            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Hello",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Goodbye",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Thank you",
                  imageSrc: null,
                  audioSrc: null,
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Xin chào",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Tạm biệt",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Cảm ơn",
                  imageSrc: null,
                  audioSrc: null,
                },
              ]);
            }

            
            // Challenge 4: Sinh nhật (Birthday)
            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Hello",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Goodbye",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Thank you",
                  imageSrc: null,
                  audioSrc: null,
                },
              ]);
            }


            // Challenge 5: Khoẻ (Healthy/How are you?)
            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Hello",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Goodbye",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Thank you",
                  imageSrc: null,
                  audioSrc: null,
                },
              ]);
            }

            // Challenge 6: What is this sign? (Sinh nhật)
            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Giáng sinh",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Sinh nhật",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Năm mới",
                  imageSrc: null,
                  audioSrc: null,
                },
              ]);
            }

            // Challenge 7: What is this sign? (Khoẻ)
            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Tôi khoẻ",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Xin chào",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Tạm biệt",
                  imageSrc: null,
                  audioSrc: null,
                },
              ]);
            }

            // Challenge 8: What is this sign? (Gia đình)
            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Bạn bè",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Gia đình",
                  imageSrc: null,
                  audioSrc: null,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Đồng nghiệp",
                  imageSrc: null,
                  audioSrc: null,
                },
              ]);
            }
          }
        }
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

void main();