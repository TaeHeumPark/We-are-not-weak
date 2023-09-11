package com.ssafy.cartel.service;

import com.ssafy.cartel.domain.Article;
import com.ssafy.cartel.domain.Comment;
import com.ssafy.cartel.domain.User;
import com.ssafy.cartel.dto.ArticleDto;
import com.ssafy.cartel.dto.UpdateArticleRequest;
import com.ssafy.cartel.repository.ArticleRepository;
import com.ssafy.cartel.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor //final , @notnull 붙은 필드의 생성자 추가
@Service //빈으로 등록
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    @Transactional
    public Article save(ArticleDto articleDto){

        User user = userRepository.findById(articleDto.getUserId())
                .orElseThrow(()-> new IllegalArgumentException("not found:" ));

        user.point(1);
        Article article = Article.builder()
                .title(articleDto.getTitle())
                .content(articleDto.getContent())
                .level(articleDto.getLevel())
                .views(0)
                .user(user)
                .type(articleDto.getType())
                .date(LocalDateTime.now())
                .status(0)
                .build();

        return articleRepository.save(article);
    }

    public List<Article> findAllByType(Integer id){//user id
        List<Article> articles = articleRepository.findAllByType(id);
        return articles;
    }

    public Article findById(Integer id){
        return articleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found:" + id));
    }
    public void delete(Integer id){
        articleRepository.deleteById(id);
    }

    @Transactional
    public Article update(Integer id, UpdateArticleRequest request){
        Article article = articleRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("not found:" + id));

        article.update(request.getTitle(), request.getContent());
        return article;
    }

    @Transactional
    public void view(Integer id){
        Article article = articleRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("not found:" + id));
        article.view(article.getViews());

    }

//    @Transactional
//    public void comment(Integer id, Comment comment){
//        Article article = articleRepository.findById(id)
//                .orElseThrow(()-> new IllegalArgumentException("not found:" + id));
//        article.getComments().add(comment);
//        article.comment(article.getComments());
//    }




}