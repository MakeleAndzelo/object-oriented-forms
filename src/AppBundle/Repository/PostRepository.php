<?php

namespace AppBundle\Repository;


use Doctrine\ORM\EntityRepository;

class PostRepository extends EntityRepository
{
    public function findAllPostsOrderById()
    {
        return $this->createQueryBuilder('post')
            ->orderBy('post.id', 'DESC')
            ->getQuery()
            ->execute();
    }
}