// Simple localStorage-backed data layer
(function () {
  const KEYS = {
    posts: 'news.posts',
    feedback: 'news.feedback'
  };

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function uid() {
    return 'id-' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }

  // Seed demo posts if empty
  const seeded = load(KEYS.posts, null);
  if (!seeded) {
    const seedPosts = [
      {
        id: uid(),
        title: 'Science Fair 2025',
        type: 'Event',
        emoji: '🏫',
        body: 'Our annual Science Fair was a huge success! Students presented creative projects about renewable energy and robotics.',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5
      },
      {
        id: uid(),
        title: 'Inter-School Sports Day',
        type: 'Achievement',
        emoji: '🏅',
        body: 'Willow School won 3 gold medals in athletics! Congratulations to all participants for their energy and teamwork.',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2
      }
    ];
    save(KEYS.posts, seedPosts);
    save(KEYS.feedback, []);
  }

  const News = {
    all() {
      return load(KEYS.posts, []);
    },
    get(id) {
      return News.all().find(p => p.id === id) || null;
    },
    create(post) {
      const posts = News.all();
      const newPost = { id: uid(), createdAt: Date.now(), ...post };
      posts.unshift(newPost);
      save(KEYS.posts, posts);
      return newPost;
    },
    remove(id) {
      const posts = News.all().filter(p => p.id !== id);
      save(KEYS.posts, posts);
    }
  };

  const Feedback = {
    list() { return load(KEYS.feedback, []); },
    add(item) {
      const list = Feedback.list();
      list.unshift({ ...item, id: uid(), createdAt: Date.now() });
      save(KEYS.feedback, list);
    },
    remove(id) {
      const list = Feedback.list().filter(f => f.id !== id);
      save(KEYS.feedback, list);
    }
  };

  // Expose globally
  window.News = News;
  window.Feedback = Feedback;

  // Small helpers
  window.fmtDate = ts => new Date(ts).toLocaleString();
})();

