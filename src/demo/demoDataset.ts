/**
 * Simulated session data mirroring app/ui/demo_dataset.py::_build_demo_batches
 * and DEMO_PREPROCESS_STATS — same batch IDs, file counts, questionnaire shapes,
 * and AI suggestion payloads for presentation fidelity.
 */

import type { AiSuggestions, DemoBatch, DemoMediaFile, PreprocessStats } from "./types";

const iso = (y: number, m: number, d: number, h: number, mi: number) =>
  new Date(Date.UTC(y, m - 1, d, h, mi, 0)).toISOString();

function addMin(isoStr: string, minutes: number): string {
  const t = new Date(isoStr).getTime() + minutes * 60_000;
  return new Date(t).toISOString();
}

function media(
  filename: string,
  mediaType: "image" | "video",
  whenIso: string,
  opts: Partial<
    Pick<DemoMediaFile, "chosenSource" | "exifMissing" | "needsReview" | "videoDurationSec" | "videoWidth" | "videoHeight">
  > & { id?: string }
): DemoMediaFile {
  return {
    id: opts.id ?? `${filename}-${whenIso}`,
    filename,
    mediaType,
    chosenIso: whenIso,
    chosenSource: opts.chosenSource ?? "exif",
    exifMissing: opts.exifMissing ?? false,
    needsReview: opts.needsReview ?? false,
    videoDurationSec: opts.videoDurationSec,
    videoWidth: opts.videoWidth,
    videoHeight: opts.videoHeight,
  };
}

export const DEMO_PREPROCESS_STATS: PreprocessStats = {
  total_scanned: 52,
  usable: 47,
  exif_missing: 9,
  corrupt: 2,
};

export function buildPresentationBatches(): DemoBatch[] {
  const t0 = iso(2026, 2, 18, 9, 15);

  const filesB001: DemoMediaFile[] = Array.from({ length: 6 }, (_, i) =>
    media("outreach_tabling_001.jpg", "image", addMin(t0, i * 3), { chosenSource: "exif" })
  );

  const qComplete: Record<string, string> = {
    event_name: "Spring Neighborhood Safety Fair — Tabling",
    event_type: "Community Outreach",
    unit_team: "Community Engagement",
    tags: "tabling, brochures, youth corner",
    intended_usage: "Community outreach materials",
    sensitivity_level: "Public",
  };

  const aiB001: AiSuggestions = {
    event_type: "Community Outreach",
    location_type: "outdoor",
    confidence: { event_type: 0.84, location_type: 0.76 },
    confidence_label: "High",
    sample_size: 4,
    event_type_source: "clip",
    suggested_additional_tags: ["Public-facing", "Outdoor"],
    suggested_intended_usage: "Community outreach materials",
  };

  const t2 = iso(2026, 2, 19, 14, 0);
  const namesB002 = [
    "IMG_2044.jpg",
    "IMG_2045.jpg",
    "copy_of_event_photos_03.jpg",
    "staff_phone_12.jpg",
    "IMG_2046.jpg",
    "IMG_2047.jpg",
    "community_hall_angle2.jpg",
    "IMG_2048.jpg",
  ];
  const filesB002 = namesB002.map((name, i) =>
    media(name, "image", addMin(t2, i * 5), {
      chosenSource: "fallback",
      exifMissing: true,
    })
  );

  const qPartial: Record<string, string> = {
    event_name: "Victim services info session (date TBC)",
    event_type: "",
    unit_team: "Victim Witness Assistance",
    tags: "victims, intake desk",
    intended_usage: "",
    sensitivity_level: "Internal",
  };

  const t3 = iso(2026, 2, 21, 11, 20);
  const filesB003: DemoMediaFile[] = [
    media("press_avail_cameraA_01.jpg", "image", t3, {}),
    media("press_avail_cameraA_02.jpg", "image", addMin(t3, 2), {
      needsReview: true,
      exifMissing: true,
      chosenSource: "fallback",
    }),
    media("press_avail_cameraA_03.jpg", "image", addMin(t3, 4), { needsReview: true }),
    media("IMG_unsorted_7781.jpg", "image", addMin(t3, 9), {}),
  ];

  const qPress: Record<string, string> = {
    event_name: "",
    event_type: "Press Conference",
    unit_team: "Communications Unit",
    tags: "press, podium",
    intended_usage: "Press / media kit",
    sensitivity_level: "Public",
  };

  const aiB003: AiSuggestions = {
    event_type: "Press Conference",
    location_type: "unsure",
    confidence: { event_type: 0.82, location_type: 0 },
    confidence_label: "Medium",
    sample_size: 2,
    event_type_source: "path",
    suggested_additional_tags: ["Press", "Public-facing", "Media presence"],
    suggested_intended_usage: "Press / media kit",
  };

  const t4 = iso(2026, 2, 23, 13, 50);
  const filesB004: DemoMediaFile[] = [
    media("school_visit_arrival.jpg", "image", t4, {}),
    {
      id: "classroom_qa_segment.mp4",
      filename: "classroom_qa_segment.mp4",
      mediaType: "video",
      chosenIso: addMin(t4, 12),
      chosenSource: "video_tag",
      exifMissing: false,
      needsReview: false,
      videoDurationSec: 132,
      videoWidth: 1280,
      videoHeight: 720,
    },
    media("school_visit_group_photo.jpg", "image", addMin(t4, 25), {
      needsReview: true,
      exifMissing: true,
      chosenSource: "fallback",
    }),
    media("school_visit_handouts.jpg", "image", addMin(t4, 33), {}),
  ];

  const qSchool: Record<string, string> = {
    event_name: "Lincoln High — Youth outreach visit",
    event_type: "School / Youth Program",
    unit_team: "Community Engagement",
    tags: "youth, school visit, handouts",
    intended_usage: "Website / intranet",
    sensitivity_level: "Internal",
    event_date: "2026-02-23",
  };

  const aiB004: AiSuggestions = {
    event_type: "School / Youth Program",
    location_type: "indoor",
    confidence: { event_type: 0.61, location_type: 0.55 },
    confidence_label: "Medium",
    sample_size: 3,
    event_type_source: "clip",
    suggested_additional_tags: ["Youth", "Indoor"],
    suggested_intended_usage: "Training / education",
  };

  const span = (files: DemoMediaFile[]) => {
    const times = files.map((f) => f.chosenIso).sort();
    return { start: times[0], end: times[times.length - 1] };
  };

  const s1 = span(filesB001);
  const s2 = span(filesB002);
  const s3 = span(filesB003);
  const s4 = span(filesB004);

  return [
    {
      batchId: "B001",
      startIso: s1.start,
      endIso: s1.end,
      files: filesB001,
      questionnaire: qComplete,
      aiSuggestions: aiB001,
      aiStatus: "ready",
      aiApplied: false,
    },
    {
      batchId: "B002",
      startIso: s2.start,
      endIso: s2.end,
      files: filesB002,
      questionnaire: qPartial,
      aiSuggestions: null,
      aiStatus: "skipped",
      aiApplied: false,
    },
    {
      batchId: "B003",
      startIso: s3.start,
      endIso: s3.end,
      files: filesB003,
      questionnaire: qPress,
      aiSuggestions: aiB003,
      aiStatus: "ready",
      aiApplied: false,
    },
    {
      batchId: "B004",
      startIso: s4.start,
      endIso: s4.end,
      files: filesB004,
      questionnaire: qSchool,
      aiSuggestions: aiB004,
      aiStatus: "ready",
      aiApplied: false,
    },
  ];
}

/** Stable preview image URL — browser-safe stand-in for scan directory mounts + ui.image in NiceGUI */
export function previewImageUrl(batchId: string, filename: string): string {
  const seed = encodeURIComponent(`${batchId}/${filename}`);
  return `https://picsum.photos/seed/${seed}/960/600`;
}
