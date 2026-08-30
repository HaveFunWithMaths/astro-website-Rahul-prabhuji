/**
 * Content Loader Module
 * Loads and processes HomeContent.txt into rich semantic presentation.
 */

const fallbackHomeContent = `# 🌌 THE STORY BEGINS TODAY…

*I never planned to become an astrologer.*

In fact, if someone had told me a few years ago that one day I would formally step into the world of *Astrology, Vastu, Numerology and the deeper dimensions of Indian spiritual wisdom*, I probably would have laughed.

My journey had taken me in an entirely different direction.

*Science. Research. IIT. A Ph.D. Analytical thinking. Questioning. Evidence. Logic.*

I am *Dr. Rahul Trivedi, Ph.D. from IIT-Madras* — and for most of my life, this was the world I knew.

But there was another story running quietly in the background…

A story I had almost forgotten.

*Two or three generations before me, my family had a very deep association with traditional knowledge — priests, astrologers and people devoted to these ancient sciences.*

And then, somewhere along the way, that thread became almost invisible.

The next generations moved on.

And I moved very far away from it.

Or at least… *I thought I had.*

---

### ✨ Then something strange began to happen.

Over the last few years, I found myself becoming increasingly drawn towards Astrology, Numerology, Vastu and several other branches of our ancient knowledge traditions.

Initially, it was simply curiosity.

Then came study.

Then deeper study.

And somewhere along that journey, something changed.

I started seeing these subjects through a very different lens.

Not merely through *belief*.

Not merely through *blind faith*.

But through the eyes of a *researcher* — looking for patterns, relationships, principles, logic and deeper connections.

And at the same time, something else began developing…

*Intuition.*

The more I studied, the more I felt that there were dimensions here that could not simply be dismissed as superstition — nor could they be understood merely by accepting everything unquestioningly.

They needed to be *studied, questioned, experienced and understood.*

And then, particularly over the last few months, one thought started returning to me again and again.

Almost like a whisper.

Almost like a calling.

> *“You are supposed to do something with this.”*

---

### 🙏 And I began wondering…

Is this merely my curiosity?

Or is something much deeper happening?

Could it be that something carried through my family for generations has somehow found its way back to me?

Could it be the subtle blessings of ancestors?

Could it be the guidance of my Gurus?

Or perhaps…

*Krishna's way of opening a door I was never looking for?*

I don't know the answer.

And perhaps I don't need to.

Because sometimes, *the most important journeys in life are not the ones we choose.*

They are the ones we are *called towards.*

---

### 🌟 And that is why today is different.

For quite some time, I have been informally helping people with *Astrology, Numerology, Vastu and various spiritual and occult traditions.*

But today, I am taking a conscious step forward.

*I am formally beginning this journey.*

Not because I was searching for another source of income.

Not because I wanted another professional label.

And certainly not because I believe I have all the answers.

Quite the opposite.

*I am beginning because I feel I have something meaningful to explore — and something meaningful to share.*

My IIT and research background has taught me to *question.*

My scientific training has taught me to *analyse.*

My years of experience have taught me to *observe.*

And my journey into these ancient traditions is teaching me to *listen to intuition.*

Perhaps the real uniqueness lies in bringing these seemingly different worlds together.

### **Logic + Intuition.

Science + Spirituality.
Ancient Wisdom + Contemporary Thinking.**

Not to replace one with the other…

but to explore what becomes possible when we approach both with an *open, curious and analytical mind.*

---

## 🌌 So, this is not simply the launch of an Astrology venture.

*It is the beginning of a personal journey that, in many ways, feels as though it began long before I was born.*

A journey from my ancestors…

through science…

through research…

through years of questioning…

and finally, perhaps, back to where it all began.

*And maybe this is the moment when that forgotten thread gets picked up again.*

✨ *Welcome to My Astro Academy.*

*Astrology | Vastu | Numerology | Spirituality | Mantra | Dhyana | Vedanta | Yoga | Sadhana & more*

A holistic approach towards understanding *life, choices, relationships, spaces, possibilities and the journey ahead.*

I don't promise miracles.

I don't claim to know everything.

*I simply promise to approach this journey with sincerity, knowledge, analytical thinking, intuition and humility.*

And perhaps…

*the most interesting part of this journey is not where it will take you.*

*It is where it will take all of us.* 🌌🙏

*— Dr. Rahul Trivedi*
Ph.D. (IIT-Madras)
*My Astro Academy*`;

class NarrativeContentManager {
  constructor() {
    this.rawContent = '';
    this.parsedHtml = '';
  }

  async loadContent() {
    const paths = ['public/assets/HomeContent.txt', 'assets/HomeContent.txt', '/public/assets/HomeContent.txt', '/assets/HomeContent.txt'];
    let loaded = false;

    for (const path of paths) {
      try {
        const response = await fetch(path);
        if (response.ok) {
          this.rawContent = await response.text();
          loaded = true;
          break;
        }
      } catch (e) {
        // continue to next path
      }
    }

    if (!loaded) {
      this.rawContent = fallbackHomeContent;
    }

    this.render();
  }

  markdownToHtml(md) {
    let html = md
      // Headings
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h2>$1</h2>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Bold & Italic
      .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/\_(.*?)\_/gim, '<em>$1</em>')
      // Horizontal rules
      .replace(/^---$/gim, '<div class="story-divider"><span class="divider-star">✦</span></div>')
      // Line breaks to paragraphs
      .split('\n\n')
      .map(paragraph => {
        paragraph = paragraph.trim();
        if (!paragraph) return '';
        if (paragraph.startsWith('<h') || paragraph.startsWith('<blockquote') || paragraph.startsWith('<div')) {
          return paragraph;
        }
        return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
      })
      .join('\n');

    return html;
  }

  render() {
    const storyContainer = document.getElementById('full-story-content');
    if (storyContainer) {
      storyContainer.innerHTML = this.markdownToHtml(this.rawContent);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const manager = new NarrativeContentManager();
  manager.loadContent();
});
