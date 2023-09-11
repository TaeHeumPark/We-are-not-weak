package com.ssafy.cartel.controller;

import com.ssafy.cartel.domain.Article;
import com.ssafy.cartel.domain.User;
import com.ssafy.cartel.dto.ArticleDto;
import com.ssafy.cartel.dto.ArticleResponse;
import com.ssafy.cartel.dto.CommentResponse;
import com.ssafy.cartel.dto.UpdateArticleRequest;
import com.ssafy.cartel.service.ArticleService;
import com.ssafy.cartel.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController //json 반환
public class ArticleController {

    private final ArticleService articleService;

    @PostMapping("/articles")
    public ResponseEntity<ArticleResponse> addArticle(@RequestBody ArticleDto articleDto){
        Article savedArticle = articleService.save(articleDto);
        ArticleResponse articleResponse = new ArticleResponse(savedArticle);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(articleResponse);
    }

    @GetMapping("/articles/{id}")
    public ResponseEntity<ArticleResponse> findArticle(@PathVariable Integer id){
        ArticleResponse articleResponse = new ArticleResponse(articleService.findById(id));

        return ResponseEntity.ok()
                .body(articleResponse);
    }

    @DeleteMapping("/articles/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Integer id){
        articleService.delete(id);

        return ResponseEntity.ok()
                .build();
    }

    @PutMapping("/articles/{id}")
    public ResponseEntity<ArticleResponse> updateArticle(@PathVariable Integer id, @RequestBody UpdateArticleRequest request){
        ArticleResponse articleResponse = new ArticleResponse(articleService.update(id,request));

        return ResponseEntity.ok()
                .body(articleResponse);
    }

    @GetMapping("/articles/community")
    public ResponseEntity<List<ArticleResponse>> findAllCommunity() {
        List<ArticleResponse> articles = articleService.findAllByType(0)
                .stream()
                .map(ArticleResponse::new)
                .toList();
        return ResponseEntity.ok()
                .body(articles);
    }
    @GetMapping("/articles/notice")
    public ResponseEntity<List<ArticleResponse>> findAllNotice() {
        List<ArticleResponse> articles = articleService.findAllByType(1)
                .stream()
                .map(ArticleResponse::new)
                .toList();
        return ResponseEntity.ok()
                .body(articles);
    }

    @GetMapping("/articles/faq")
    public ResponseEntity<List<ArticleResponse>> findAllFaq() {
        List<ArticleResponse> articles = articleService.findAllByType(2)
                .stream()
                .map(ArticleResponse::new)
                .toList();
        return ResponseEntity.ok()
                .body(articles);
    }
}
