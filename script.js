 // DOM Elements - Cached for better performance
        const elements = {
            form: document.getElementById('contentForm'),
            contentText: document.getElementById('contentText'),
            outputFormat: document.getElementById('outputFormat'),
            customInstruction: document.getElementById('customInstruction'),
            loadingIndicator: document.getElementById('loadingIndicator'),
            outputContainer: document.getElementById('outputContainer'),
            outputContent: document.getElementById('outputContent'),
            copyBtn: document.getElementById('copyBtn'),
            newConversionBtn: document.getElementById('newConversionBtn'),
            submitBtn: document.getElementById('submitBtn'),
            alertContainer: document.getElementById('alertContainer')
        };

        // Event Listeners
        elements.form.addEventListener('submit', handleSubmit);
        elements.copyBtn.addEventListener('click', copyToClipboard);
        elements.newConversionBtn.addEventListener('click', resetForm);

        // Main submission handler
        async function handleSubmit(e) {
            e.preventDefault();
            
            const content = elements.contentText.value.trim();
            const format = elements.outputFormat.value;
            const instruction = elements.customInstruction.value.trim();
            
            // Validation
            if (!content || content.length < 50) {
                showAlert('Please enter at least 50 characters of content', 'error');
                return;
            }
            
            // UI Updates
            toggleLoading(true);
            hideAlert();
            
            try {
                const output = generateContent(content, format, instruction);
                displayOutput(output);
            } catch (error) {
                console.error('Error:', error);
                showAlert('An error occurred while processing your content. Please try again.', 'error');
            } finally {
                toggleLoading(false);
            }
        }

        // Content generation (local - no API keys exposed)
        function generateContent(content, format, instruction) {
            const processors = {
                'podcast-script': generatePodcastScript,
                'study-guide': generateStudyGuide,
                'blog-post': generateBlogPost,
                'presentation': generatePresentationOutline
            };
            
            const processor = processors[format];
            if (!processor) {
                throw new Error('Invalid format selected');
            }
            
            return processor(content, instruction);
        }

        // Podcast Script Generator
        function generatePodcastScript(content, instruction) {
            const title = extractTitle(content);
            const topic = extractTopic(content);
            const keyPoints = extractKeyPoints(content, 4);
            
            let script = `🎙️ PODCAST SCRIPT: ${title}\n\n`;
            script += `[INTRO MUSIC FADES]\n\n`;
            script += `HOST: Welcome back to "Deep Dive Discussions"! I'm your host, Alex Martinez. Today, we're exploring something truly fascinating - ${topic}.\n\n`;
            script += `CO-HOST: Hey Alex! I'm Dr. Sarah Chen, and I'm excited to unpack this topic with you today. This is definitely something our listeners will find valuable.\n\n`;
            
            script += `HOST: Absolutely! So Sarah, let's start from the ground up. For anyone just tuning in, what exactly are we talking about here?\n\n`;
            script += `CO-HOST: Great question! ${extractMainIdea(content)}. Think of it as a framework that helps us understand complex interactions in a more intuitive way.\n\n`;
            
            script += `HOST: That's a helpful way to frame it. Now, what are the main things our listeners should grasp about this topic?\n\n`;
            
            keyPoints.forEach((point, index) => {
                const speakerLabel = index % 2 === 0 ? 'CO-HOST' : 'HOST';
                const otherSpeaker = index % 2 === 0 ? 'HOST' : 'CO-HOST';
                
                script += `${speakerLabel}: ${point.trim()}. This is crucial because it fundamentally changes how we approach the problem.\n\n`;
                script += `${otherSpeaker}: That's really insightful! Can you give us a practical example of this in action?\n\n`;
                script += `${speakerLabel}: Certainly! Imagine you're trying to solve a common workplace challenge. By applying this principle, you'd approach it differently - focusing on root causes rather than symptoms.\n\n`;
            });
            
            script += `HOST: We've covered so much ground today. If you had to distill this into one key takeaway, what would it be?\n\n`;
            script += `CO-HOST: The essential insight is this: ${generateSummary(content)}. Understanding this principle can genuinely transform how you approach similar challenges in your own work and life.\n\n`;
            
            script += `HOST: Brilliant perspective, Sarah. Before we wrap up, any final thoughts for our audience?\n\n`;
            script += `CO-HOST: Just remember - knowledge is most powerful when applied. Take one concept from today's discussion and try implementing it this week. You'll be amazed at the results.\n\n`;
            
            script += `HOST: Wise words indeed! Thanks so much for joining us, Dr. Chen.\n\n`;
            script += `CO-HOST: Always a pleasure, Alex!\n\n`;
            script += `HOST: That's all for today's episode. Don't forget to subscribe and leave us a review. Until next time, keep learning and keep growing!\n\n`;
            script += `[OUTRO MUSIC]\n\n`;
            
            if (instruction) {
                script += `\n---\n📝 Custom Instructions Applied: ${instruction}`;
            }
            
            return script;
        }

        // Study Guide Generator
        function generateStudyGuide(content, instruction) {
            const title = extractTitle(content);
            const keyPoints = extractKeyPoints(content, 6);
            const terms = extractKeyTerms(content);
            
            let guide = `📚 COMPREHENSIVE STUDY GUIDE\n`;
            guide += `${'='.repeat(50)}\n\n`;
            guide += `TITLE: ${title}\n\n`;
            
            guide += `📋 OVERVIEW:\n`;
            guide += `${extractFirstParagraph(content)}\n\n`;
            
            guide += `🎯 LEARNING OBJECTIVES:\n`;
            guide += `After studying this material, you should be able to:\n`;
            guide += `• Understand the core concepts and their applications\n`;
            guide += `• Identify key relationships between different elements\n`;
            guide += `• Apply knowledge to practical scenarios\n`;
            guide += `• Explain concepts clearly to others\n\n`;
            
            guide += `💡 KEY CONCEPTS:\n`;
            keyPoints.forEach((point, index) => {
                guide += `\n${index + 1}. ${point.trim()}\n`;
                guide += `   └─ Why it matters: This forms the foundation for understanding subsequent concepts.\n`;
            });
            
            guide += `\n\n📖 IMPORTANT TERMINOLOGY:\n`;
            terms.forEach(term => {
                guide += `• ${term}: A critical component that influences the overall framework\n`;
            });
            
            guide += `\n\n📝 SUMMARY:\n`;
            guide += `${generateSummary(content)}\n\n`;
            
            guide += `🎓 STUDY STRATEGIES:\n`;
            guide += `✓ Review key concepts daily for 15-20 minutes\n`;
            guide += `✓ Create flashcards for important terms\n`;
            guide += `✓ Practice explaining concepts in your own words\n`;
            guide += `✓ Connect new information to what you already know\n`;
            guide += `✓ Form study groups to discuss and debate ideas\n`;
            guide += `✓ Test yourself regularly without looking at notes\n\n`;
            
            guide += `💪 PRACTICE QUESTIONS:\n`;
            guide += `1. What are the main principles discussed in this material?\n`;
            guide += `2. How do these concepts apply to real-world scenarios?\n`;
            guide += `3. What connections can you draw between different concepts?\n`;
            guide += `4. Can you explain this to someone unfamiliar with the topic?\n\n`;
            
            if (instruction) {
                guide += `---\n📌 Custom Focus: ${instruction}`;
            }  return guide;
        }

        // Blog Post Generator
        function generateBlogPost(content, instruction) {
            const title = extractTitle(content);
            const keyPoints = extractKeyPoints(content, 4);
            const topic = extractTopic(content);
            
            let blog = `✍️ ${title}\n`;
            blog += `${'='.repeat(title.length + 3)}\n\n`;
            
            blog += `## Introduction\n\n`;
            blog += `Have you ever wondered about ${topic}? You're not alone. In today's fast-paced world, understanding this concept has become more crucial than ever.\n\n`;
            blog += `In this article, we'll explore the key insights you need to know, break down complex ideas into digestible pieces, and show you how to apply this knowledge in practical ways.\n\n`;
            
            blog += `## The Big Picture\n\n`;
            blog += `${extractMainIdea(content)}. This foundational understanding sets the stage for everything else we'll discuss.\n\n`;
            
            keyPoints.forEach((point, index) => {
                blog += `## ${index === 0 ? 'Understanding the Fundamentals' : `Key Insight #${index}`}\n\n`;
                blog += `${point.trim()}.\n\n`;
                blog += `This matters because it directly impacts how we approach related challenges. Let's break this down further:\n\n`;
                blog += `- **Practical Application**: Consider how this applies to your daily work or life\n`;
                blog += `- **Common Pitfalls**: Be aware of misconceptions that can lead you astray\n`;
                blog += `- **Best Practices**: Follow proven strategies for optimal results\n\n`;
            });
            
            blog += `## Real-World Applications\n\n`;
            blog += `So how can you actually use this information? Here are some actionable ways to implement what you've learned:\n\n`;
            blog += `1. **Start Small**: Begin with one concept and master it before moving on\n`;
            blog += `2. **Track Progress**: Monitor your results and adjust your approach as needed\n`;
            blog += `3. **Share Knowledge**: Teach others to reinforce your own understanding\n`;
            blog += `4. **Stay Curious**: Continue learning and exploring related topics\n\n`;
            
            blog += `## Key Takeaways\n\n`;
            blog += `Let's recap what we've covered:\n\n`;
            blog += `${generateSummary(content)}\n\n`;
            blog += `By understanding and applying these principles, you're now better equipped to navigate this complex topic with confidence.\n\n`;
            
            blog += `## What's Next?\n\n`;
            blog += `Knowledge without action is just potential. I encourage you to pick one concept from this article and implement it this week. Start small, stay consistent, and watch as your understanding deepens.\n\n`;
            blog += `Have questions or insights to share? I'd love to hear your thoughts in the comments below!\n\n`;
            
            if (instruction) {
                blog += `---\n*Note: ${instruction}*\n`;
            } return blog;
        }
        // Presentation Outline Generator
        function generatePresentationOutline(content, instruction) {
            const title = extractTitle(content);
            const keyPoints = extractKeyPoints(content, 5);
            
            let presentation = `📊 PRESENTATION OUTLINE\n`;
            presentation += `${'='.repeat(50)}\n\n`;
            presentation += `PRESENTATION TITLE: ${title}\n\n`;
            
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `SLIDE 1: TITLE SLIDE\n`;
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `• Main Title: ${title}\n`;
            presentation += `• Subtitle: Key Insights and Practical Applications\n`;
            presentation += `• Presenter: [Your Name]\n`;
            presentation += `• Date: [Presentation Date]\n`;
            presentation += `• Visual: Clean, professional design with company/institution logo\n\n`;
            
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `SLIDE 2: AGENDA & OBJECTIVES\n`;
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `What We'll Cover Today:\n`;
            presentation += `1. Introduction and context\n`;
            presentation += `2. Core concepts breakdown\n`;
            presentation += `3. Practical applications\n`;
            presentation += `4. Key takeaways and next steps\n\n`;
            presentation += `Learning Objectives:\n`;
            presentation += `• Understand fundamental principles\n`;
            presentation += `• Identify real-world applications\n`;
            presentation += `• Develop actionable strategies\n`;
            presentation += `• Visual: Timeline or roadmap graphic\n\n`;
            
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `SLIDE 3: SETTING THE STAGE\n`;
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `Opening Hook:\n`;
            presentation += `"${extractFirstSentence(content)}"\n\n`;
            presentation += `Why This Matters:\n`;
            presentation += `• Current industry landscape\n`;
            presentation += `• Emerging trends and challenges\n`;
            presentation += `• Opportunity for innovation\n`;
            presentation += `• Visual: Infographic showing relevance/impact statistics\n\n`;
            
            keyPoints.forEach((point, index) => {
                presentation += `══════════════════════════════════════════════════\n`;
                presentation += `SLIDE ${4 + index}: ${index === 0 ? 'CORE CONCEPT' : `KEY INSIGHT #${index}`}\n`;
                presentation += `══════════════════════════════════════════════════\n`;
                presentation += `Main Point:\n`;
                presentation += `${point.trim()}\n\n`;
                presentation += `Supporting Details:\n`;
                presentation += `• Evidence and data points\n`;
                presentation += `• Expert perspectives\n`;
                presentation += `• Case study or example\n\n`;
                presentation += `Talking Points:\n`;
                presentation += `- Explain the 'why' behind this concept\n`;
                presentation += `- Connect to audience's experiences\n`;
                presentation += `- Address potential questions or concerns\n\n`;
                presentation += `Visual Suggestion: ${getVisualSuggestion(index)}\n\n`;
            });
            
            const nextSlide = 4 + keyPoints.length;
            
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `SLIDE ${nextSlide}: PRACTICAL APPLICATIONS\n`;
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `How to Implement:\n`;
            presentation += `1. Assessment Phase\n`;
            presentation += `   • Evaluate current state\n`;
            presentation += `   • Identify gaps and opportunities\n\n`;
            presentation += `2. Planning Phase\n`;
            presentation += `   • Set clear objectives\n`;
            presentation += `   • Allocate resources\n\n`;
            presentation += `3. Execution Phase\n`;
            presentation += `   • Follow best practices\n`;
            presentation += `   • Monitor progress\n\n`;
            presentation += `4. Optimization Phase\n`;
            presentation += `   • Measure results\n`;
            presentation += `   • Iterate and improve\n\n`;
            presentation += `Visual: Step-by-step diagram or workflow chart\n\n`;
            
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `SLIDE ${nextSlide + 1}: CHALLENGES & SOLUTIONS\n`;
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `Common Obstacles:\n`;
            presentation += `• Challenge 1: [Typical roadblock]\n`;
            presentation += `  Solution: [Proven approach]\n\n`;
            presentation += `• Challenge 2: [Common pitfall]\n`;
            presentation += `  Solution: [Strategic response]\n\n`;
            presentation += `• Challenge 3: [Potential barrier]\n`;
            presentation += `  Solution: [Effective workaround]\n\n`;
            presentation += `Visual: Problem-solution matrix or comparison table\n\n`;
            
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `SLIDE ${nextSlide + 2}: SUCCESS METRICS\n`;
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `How to Measure Impact:\n`;
            presentation += `• Key Performance Indicators (KPIs)\n`;
            presentation += `• Quantitative metrics\n`;
            presentation += `• Qualitative feedback\n`;
            presentation += `• Timeline for assessment\n\n`;
            presentation += `Expected Outcomes:\n`;
            presentation += `• Short-term wins (0-3 months)\n`;
            presentation += `• Medium-term gains (3-12 months)\n`;
            presentation += `• Long-term transformation (12+ months)\n\n`;
            presentation += `Visual: Dashboard mockup or metrics chart\n\n`;
            
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `SLIDE ${nextSlide + 3}: KEY TAKEAWAYS\n`;
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `Remember These Points:\n`;
            presentation += `✓ ${generateSummary(content)}\n\n`;
            presentation += `Main Insights:\n`;
            presentation += `1. Understanding leads to better decision-making\n`;
            presentation += `2. Application requires thoughtful planning\n`;
            presentation += `3. Continuous improvement is essential\n`;
            presentation += `4. Results compound over time\n\n`;
            presentation += `Visual: Bold, memorable graphics with key phrases\n\n`;
            
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `SLIDE ${nextSlide + 4}: NEXT STEPS & RESOURCES\n`;
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `Action Items:\n`;
            presentation += `□ Review key concepts from today\n`;
            presentation += `□ Identify one area to implement immediately\n`;
            presentation += `□ Schedule follow-up for progress review\n`;
            presentation += `□ Share insights with your team\n\n`;
            presentation += `Additional Resources:\n`;
            presentation += `• Further reading materials\n`;
            presentation += `• Online courses or workshops\n`;
            presentation += `• Community forums or discussion groups\n`;
            presentation += `• Expert consultations\n\n`;
            presentation += `Visual: Resource links and QR codes\n\n`;
            
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `SLIDE ${nextSlide + 5}: Q&A / CLOSING\n`;
            presentation += `══════════════════════════════════════════════════\n`;
            presentation += `• Open floor for questions\n`;
            presentation += `• Contact information\n`;
            presentation += `• Thank you message\n`;
            presentation += `• Call to action\n\n`;
            presentation += `Closing Statement:\n`;
            presentation += `"The journey of understanding begins with a single step. Take that step today!"\n\n`;
            presentation += `Visual: Professional thank you slide with contact details\n\n`;
            
            if (instruction) {
                presentation += `══════════════════════════════════════════════════\n`;
                presentation += `📌 CUSTOM INSTRUCTIONS APPLIED:\n`;
                presentation += `${instruction}\n`;
                presentation += `══════════════════════════════════════════════════\n`;
            }
            return presentation;
        }
        // Helper function for visual suggestions
        function getVisualSuggestion(index) {
            const suggestions = [
                'Diagram or flowchart illustrating the concept',
                'Data visualization or statistical chart',
                'Comparison table or matrix',
                'Timeline or process illustration',
                'Icon-based infographic'
            ];
            return suggestions[index % suggestions.length];
        }

        // Utility Functions - Optimized
        function extractTitle(content) {
            const sentences = content.split(/[.!?]+/);
            const firstSentence = sentences[0]?.trim() || '';
            
            if (firstSentence.length < 10) {
                return content.substring(0, 80).trim() + '...';
            }
            
            return firstSentence.length > 80 
                ? firstSentence.substring(0, 80) + '...' 
                : firstSentence;
        }

        function extractFirstSentence(content) {
            const match = content.match(/^[^.!?]+[.!?]/);
            return match ? match[0].trim() : content.substring(0, 100) + '...';
        }

        function extractFirstParagraph(content) {
            const paragraphs = content.split(/\n\n+/);
            const firstPara = paragraphs[0]?.trim() || content.substring(0, 200);
            return firstPara.length > 250 ? firstPara.substring(0, 250) + '...' : firstPara;
        }

        function extractTopic(content) {
            // Extract meaningful words (length > 4, not common words)
            const commonWords = new Set(['that', 'this', 'with', 'from', 'have', 'been', 'were', 'their', 'there', 'would', 'could', 'about']);
            const words = content.toLowerCase()
                .replace(/[^\w\s]/g, ' ')
                .split(/\s+/)
                .filter(word => word.length > 4 && !commonWords.has(word));
            
            return words[0] || 'this topic';
        }

        function extractMainIdea(content) {
            const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
            return sentences[0]?.trim() || 'This content provides valuable insights';
        }

        function extractKeyPoints(content, count = 5) {
            const sentences = content
                .split(/[.!?]+/)
                .map(s => s.trim())
                .filter(s => s.length > 30 && s.length < 300);
            
            return sentences.slice(0, Math.min(count, sentences.length));
        }

        function extractKeyTerms(content) {
            // Find capitalized words that appear multiple times (likely important terms)
            const words = content.match(/\b[A-Z][a-z]{3,}\b/g) || [];
            const frequency = {};
            
            words.forEach(word => {
                frequency[word] = (frequency[word] || 0) + 1;
            });
            
            return Object.entries(frequency)
                .filter(([_, count]) => count >= 2)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([word]) => word);
        }

        function generateSummary(content) {
            const sentences = content
                .split(/[.!?]+/)
                .map(s => s.trim())
                .filter(s => s.length > 30);
            
            const keySentences = sentences.slice(0, Math.min(3, sentences.length));
            return keySentences.join('. ') + '.';
        }

        // UI Helper Functions
        function toggleLoading(show) {
            elements.loadingIndicator.style.display = show ? 'block' : 'none';
            elements.outputContainer.style.display = show ? 'none' : elements.outputContainer.style.display;
            elements.submitBtn.disabled = show;
        }

        function displayOutput(content) {
            elements.outputContent.textContent = content;
            elements.outputContainer.style.display = 'block';
            elements.outputContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            showAlert('Content successfully generated!', 'success');
        }
        function showAlert(message, type = 'success') {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type}`;
            alertDiv.textContent = message;
            
            elements.alertContainer.innerHTML = '';
            elements.alertContainer.appendChild(alertDiv);
            alertDiv.style.display = 'block';
            
            setTimeout(() => {
                alertDiv.style.display = 'none';
            }, 4000);
        }
        function hideAlert() {
            elements.alertContainer.innerHTML = '';
        }

        function copyToClipboard() {
            const textToCopy = elements.outputContent.textContent;
            
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    const originalText = elements.copyBtn.textContent;
                    elements.copyBtn.textContent = '✅ Copied!';
                    elements.copyBtn.style.background = 'linear-gradient(135deg, var(--success) 0%, #059669 100%)';
                    
                    setTimeout(() => {
                        elements.copyBtn.textContent = originalText;
                        elements.copyBtn.style.background = '';
                    }, 2000);
                    
                    showAlert('Content copied to clipboard!', 'success');
                })
                .catch(err => {
                    console.error('Copy failed:', err);
                    showAlert('Failed to copy content. Please try again.', 'error');
                });
        }
        function resetForm() {
            elements.form.reset();
            elements.outputContainer.style.display = 'none';
            hideAlert();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // Initialize - Add stagger animation to feature cards
        document.addEventListener('DOMContentLoaded', () => {
            const featureCards = document.querySelectorAll('.feature-card');
            featureCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        });
